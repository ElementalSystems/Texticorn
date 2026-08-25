const addSprite = (c, map, gx = 0, gy = 0, rz = 0, is = 0, next) => {
  const ctl = document.createElement("div");
  ctl.classList.add(c.style, "sprite");
  const bits = c.bits.map((b) =>
    mkAnimatedCurve(b, ctl, c.bits[0].pos.length, is),
  );
  sp = {
    ctl,
    bits,
    state: is,
    moves: c.moves,
    ga: map.addA(ctl, gx, gy), //adds it to the map and gets a grid anchor node
    gx, //actual displayed co-ordinates
    gy,
    rz: rz + 100,
    ry: 0,
    cgx: gx, //current game co-ordinates (always ordinal)
    cgy: gy,
    crz: rz + 100,
    cry: 0,
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
      return animateOver(
        mb.t,
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
        },
      );
    },
    async start() {
      console.log("Started");
      while (await this.move(next?.(this)));
      console.log("ended");
    },
    async move(mn) {
      if (!mn) return false;
      //TODO: calc future co-ordinates for action buttons????
      this.cgx = this.gx;
      this.cgy = this.gy;
      this.crz = this.rz;
      this.cry = this.ry;
      for (const bit of this.moves[mn]) await this.moveBit(bit);
      //update currents to last position
      this.cgx = this.gx;
      this.cgy = this.gy;
      this.crz = this.rz;
      this.cry = this.ry;
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
    map.g_solid(sp.gx + sp.dirX(x, y), sp.gy + sp.dirY(x, y));
  const stk = (sp, x, y) =>
    map.g_stick(sp.gx + sp.dirX(x, y), sp.gy + sp.dirY(x, y));
  const emp = (sp, x, y) => !sol(sp, x, y);
  let uniE = addSprite(uni, map, gx, gy, rz, is, (s) => {
    //okay we need to choose a move...

    if (ctl.act("b", s.cry)) return "tb"; //can always turn
    if (ctl.act("f", s.cry) && sol(s, 1, 1) && emp(s, 1, 0)) return "fd";
    if (ctl.act("f", s.cry) && stk(s, 0, 0) && sol(s, 1, 0)) return "ru";
    if (ctl.act("f", s.cry) && stk(s, 0, 0) && emp(s, 1, 1) && stk(s, 1, 1))
      return "rd";

    if (ctl.act("u", s.cry) && sol(s, 3, -1) && emp(s, 3, -2)) return "ju";
    if (ctl.act("u", s.cry) && sol(s, 3, 1) && emp(s, 3, 0)) return "jf";
    if (ctl.act("d", s.cry) && sol(s, 2, 3) && emp(s, 2, 2)) return "dd";

    return "i";
  });
  map.setCameraFollow(uniE);
  return uniE;
};

const spriteFromCode = (c, map, ctl, x = 0, y = 0, rz = 0) =>
  ({
    "@": () => addUni(map, ctl, x, y, rz),
    "#": () => addSprite(prz, map, x, y, rz, 0, () => "i"), //Makes a prz that does the idle motion
    "^": () => addSprite(ext, map, x, y, rz, 0, () => "i"), //Makes an exit that does the idle motion
  })[c]?.();
