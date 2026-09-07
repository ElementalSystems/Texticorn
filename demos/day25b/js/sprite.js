const addSprite = (c, map, gx = 0, gy = 0, rz = 0, is = 0, next) => {
  const ctl = document.createElement("div");
  ctl.className = "sprite " + c.style;
  const bits = c.bits.map((b) =>
    mkAnimatedCurve(b, ctl, c.bits[0].pos.length, is),
  );
  sp = {
    ctl,
    bits,
    state: is,
    moveTF: 1, //Scales the time it takes to make a move
    moves: c.moves,
    ga: map.addA(ctl, gx, gy), //adds it to the map and gets a grid anchor node
    gx, //actual displayed co-ordinates
    gy,
    rz: rz + 100,
    ry: 0,
    f: 0, //flipped into the alt world?
    cgx: gx, //current game co-ordinates (always ordinal)
    cgy: gy,
    crz: rz + 100,
    cry: 0,
    cf: 0,
    dirX(x, y) {
      return (
        x * [1, 0, -1, 0][this.crz % 4] * (this.cry % 2 ? -1 : 1) +
        y * [0, 1, 0, -1][this.crz % 4]
      );
    },
    dirY(x, y) {
      return (
        x * [0, -1, 0, 1][this.crz % 4] * (this.cry % 2 ? -1 : 1) +
        y * [1, 0, -1, 0][this.crz % 4]
      );
    },

    moveBit(mb) {
      const ix = this.gx;
      const iy = this.gy;
      const irz = this.rz;
      const iry = this.ry;
      const fx = this.cgx + this.dirX(mb.tx || 0, mb.ty || 0);
      const fy = this.cgy + this.dirY(mb.tx || 0, mb.ty || 0);
      const frz = this.crz + (mb.trz || 0) * (this.cry % 2 ? -1 : 1);
      const fry = this.cry + (mb.try || 0);
      const ff = (this.cf + (mb.tf || 0)) % 2;
      if (mb.sVP && map.followOn) map.setVPW(mb.sVP); //move has a scale suggestion

      if (mb.sS) snd[mb.sS](((mb.sSt ?? mb.t) * this.moveTF) / 1000); //play a sounds

      if (mb.sZ) {
        //set our lift offset
        this.ga.style.setProperty("--gridZ", mb.sZ);
      }

      return animateOver(
        mb.t * this.moveTF,
        (r) => {
          bits.forEach((b) => b.positionR(r, this.state, mb.ts));
          this.setP(
            inter(r, ix, fx),
            inter(r, iy, fy),
            inter(r, irz, frz),
            inter(r, iry, fry),
          );
        },
        () => {
          bits.forEach((b) => b.positionR(1, this.state, mb.ts));
          this.state = mb.ts;
          this.setP(fx, fy, frz, fry);
          this.f = ff; //maybe flipped?
        },
      );
    },
    async start() {
      while (!map.isDead && (await this.move(next?.(this))));
    },
    async move(mn) {
      if (!mn) return false;
      this.cgx = this.gx;
      this.cgy = this.gy;
      this.crz = this.rz;
      this.cry = this.ry;
      this.cf = this.f;
      for (const bit of this.moves[mn]) await this.moveBit(bit);
      //update currents to last position
      this.cgx = this.gx;
      this.cgy = this.gy;
      this.crz = this.rz;
      this.cry = this.ry;
      this.cf = this.f;
      return true;
    },
    setP(x, y, rz, ry) {
      this.gx = x;
      this.gy = y;
      this.rz = rz;
      this.ry = ry;
      this.ga.style.setProperty("--gX", x);
      this.ga.style.setProperty("--gY", y);
      this.ga.style.setProperty("--gRZ", rz);
      this.ga.style.setProperty("--gRY", ry);
    },

    animateToState(ns, time, func = id) {
      return animateOver(
        time,
        (r) => {
          bits.forEach((b) => b.positionR(r, this.state, ns));
        },
        () => {
          bits.forEach((b) => b.positionR(1, this.state, ns));
          this.state = ns;
        },
      );
    },
  };
  sp.setP(sp.gx, sp.gy, sp.rz, sp.ry);
  sp.start();
  return sp;
};

const addUni = (map, ctl, gx = 0, gy = 0, rz = 0, is = 0) => {
  const sol = (sp, x, y) =>
    map.g_solid(sp.gx + sp.dirX(x, y), sp.gy + sp.dirY(x, y)) ^ sp.f; //XOR turns solid to empty if the world is flipped.
  const fsol = (sp, x, y) => sol(sp, x, y) & 8;
  const stk = (sp, x, y) =>
    map.g_stick(sp.gx + sp.dirX(x, y), sp.gy + sp.dirY(x, y));
  const flp = (sp, x, y) =>
    map.g_flp(sp.gx + sp.dirX(x, y), sp.gy + sp.dirY(x, y));

  const emp = (sp, x, y) => !sol(sp, x, y);
  let active = true;
  let idle = 0;

  const sA = (s) => {
    let oidle = idle;
    idle = 0;
    if (!active) return null;
    if (ctl.status == 2) {
      //level ended
      active = false;
      return "x";
    }
    if (!ctl.timerOn) return "p";
    if (flp(s, 0, 0) && sol(s, 1, 1)) return "f"; //can always flip from a bridge into rock
    if (ctl.act("b", s.cry)) return "tb"; //can always turn
    if (ctl.act("f", s.cry) && sol(s, 1, 1) && emp(s, 1, 0)) return "fd";
    if (ctl.act("f", s.cry) && stk(s, 0, 0) && sol(s, 1, 0) && !fsol(s, 1, 0))
      return "ru";
    if (ctl.act("f", s.cry) && stk(s, 0, 0) && emp(s, 1, 1) && stk(s, 1, 1))
      return "rd";

    if (ctl.act("u", s.cry) && sol(s, 1, 0) && emp(s, 1, -1)) return "u1";
    if (ctl.act("u", s.cry) && sol(s, 2, 0) && emp(s, 2, -1)) return "u1l";
    if (
      ctl.act("u", s.cry) &&
      sol(s, 2, -1) &&
      emp(s, 2, -2) &&
      emp(s, 0, -1) &&
      emp(s, 1, -1) &&
      emp(s, 1, -2)
    )
      return "u2";
    if (
      ctl.act("u", s.cry) &&
      sol(s, 2, 1) &&
      emp(s, 1, 0) &&
      emp(s, 1, -1) &&
      emp(s, 2, 0)
    )
      return "j2";
    if (
      ctl.act("u", s.cry) &&
      sol(s, 3, 1) &&
      emp(s, 3, 0) &&
      emp(s, 1, 0) &&
      emp(s, 1, -1) &&
      emp(s, 2, 0) &&
      emp(s, 2, -1)
    )
      return "j3";
    if (ctl.act("d", s.cry) && sol(s, 1, 2) && emp(s, 1, 1)) return "d1";
    if (ctl.act("d", s.cry) && sol(s, 2, 2) && emp(s, 2, 1)) return "d1l";
    if (
      ctl.act("d", s.cry) &&
      sol(s, 2, 3) &&
      emp(s, 1, 0) &&
      emp(s, 1, 1) &&
      emp(s, 2, 1) &&
      emp(s, 2, 2)
    )
      return "d2";
    if (
      ctl.act("d", s.cry) &&
      sol(s, 2, 4) &&
      emp(s, 1, 0) &&
      emp(s, 1, 1) &&
      emp(s, 1, 2) &&
      emp(s, 1, 3) &&
      emp(s, 2, 1) &&
      emp(s, 2, 2) &&
      emp(s, 2, 3)
    )
      return "d3";
    //no more legal moves
    //if we're holding controls we can deny
    if (ctl.act("f", s.cry)) return "fx";
    if (ctl.act("u", s.cry)) return "ux";
    if (ctl.act("d", s.cry)) return "dx";
    idle = oidle + 1;
    if (idle < 20) {
      return rnd(1, 3); //randomly return 1,2,3
    }
    if (!rnd(0, 10)) idle = 0;
    return "i";
  };

  let mom = 0;
  let uniE = addSprite(uni, map, gx, gy, rz, is, (s) => {
    const m = sA(s);
    //lets change momentum.
    if (["fd", "ru", "rd", "jf"].includes(m)) mom = clamp(0, 5, mom + 1);
    if (["u2", "d3", "f"].includes(m)) mom = clamp(0, 5, mom - 2);
    if (["i", "tb", "ux", "dx", "fx", "x"].includes(m)) mom = 0;

    //set the timescale
    s.moveTF = 1 - (0.6 * mom) / 5;

    return m;
  });
  map.setCameraFollow(uniE);
  return uniE;
};

addNBSprite = (c, map, x, y, rz, cb) => {
  let is = 0;
  return addSprite(c, map, x, y, rz, 0, (sp) => {
    if (is < 0) return null;
    //check if we're near by
    if (map.follow) {
      let dist = Math.hypot(x - map.follow.gx, y - map.follow.gy);
      if (dist < 0.5 && map.follow.rz % 4 == rz) {
        is = -1;
        cb?.();
        return "f";
      }
    }
    //otherwise
    is += 1;
    if (!c.moves[is]) is = 1;
    return is;
  });
};

addPrz = (map, ctl, x, y, rz) =>
  addNBSprite(prz, map, x, y, rz, () => {
    ctl.tkPrz();
  });

addExt = (map, ctl, x, y, rz) =>
  addNBSprite(ext, map, x, y, rz, () => {
    ctl.end();
  });

const spriteFromCode = (c, map, ctl, x = 0, y = 0, rz = 0) =>
  ({
    "@": () => addUni(map, ctl, x, y, rz),
    "#": () => addPrz(map, ctl, x, y, rz), //Makes a prz that does the idle motion
    $: () => addPrz(map, ctl, x, y, rz), //Makes a prz that does the idle motion
    "^": () => addExt(map, ctl, x, y, rz, 0), //Makes an exit that does the idle motion
    "(": () => addSprite(brg, map, x, y, rz, 0, () => "i"), //Makes an exit that does the idle motion
  })[c]?.();
