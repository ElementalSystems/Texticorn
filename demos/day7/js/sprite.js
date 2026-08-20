const addSprite = (c, map, gx = 0, gy = 0, rz = 0, is = 0) => {
  const ctl = document.createElement("div");
  ctl.classList.add(c.style, "sprite");
  const bits = c.bits.map((b) => mkAnimatedCurve(b, ctl, is));
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
    async move(mn) {
      //TODO: calc future co-ordinates for action buttons
      console.log("move", mn);
      for (const bit of this.moves[mn]) await this.moveBit(bit);
      //update currents to last position
      this.cgx = this.gx;
      this.cgy = this.gy;
      this.crz = this.rz;
      this.cry = this.ry;
      console.log("after move", this.cgx, this.cgy, this.crz, this.cry);
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
  return sp;
};
