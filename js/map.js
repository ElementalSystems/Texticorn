const mkMap = (lev, ctls, parentEl, layers = 5) => {
  const text = lev.map;
  const base = document.createElement("pre");
  base.classList.add("map");
  base.style.setProperty("--dct", "var(--cT" + lev.col + ")");
  base.style.setProperty("--dcb", "var(--cB" + lev.col + ")");
  base.style.setProperty("--trc", "var(--cB" + (lev.col - 1) + ")");
  base.style.setProperty("--brc", "var(--cB" + (lev.col + 1) + ")");

  parentEl.appendChild(base);
  const map = {
    base,
    scene: parentEl,
    grid: mkGrid(text),
    follow: null,
    followOn: false,
    camX: 0,
    camY: 0,
    camRZ: 0,
    isDead: 0,

    g_state(x, y) {
      return this.grid?.[y]?.[x] ?? 8;
    },
    g_solid(x, y) {
      return this.g_state(x, y) & (1 | 8);
    },
    g_stick(x, y) {
      return this.g_state(x, y) & 2;
    },
    g_flp(x, y) {
      return this.g_state(x, y) & 4;
    },

    addA(content, gx, gy) {
      const a = document.createElement("div");
      a.classList.add("ga");
      base.appendChild(a);
      a.appendChild(content);
      if (gx) {
        a.style.setProperty("--gX", gx);
      }
      if (gy) {
        a.style.setProperty("--gY", gy);
      }
      return a;
    },
    lookAt(x, y) {
      this.setCamera(x, y, 0);
      if (this.followOn) {
        this.followOn = false;
        this.camX = this.follow.gx;
        this.camY = this.follow.gy;
        this.camRZ = this.follow.rz;
      }
      let srz = this.camRZ - (this.camRZ % 4);
      animateOver(
        500,
        (r) =>
          this.setCamera(
            inter(r, this.camX, x),
            inter(r, this.camY, y),
            inter(r, this.camRZ, srz),
          ),
        () => {
          this.camX = x;
          this.camY = y;
          this.camZ = srz;
        },
      );
    },
    setVPW(w) {
      let s = 6 / w; //typically the view shows 6 rows
      this.base.style.setProperty("--viewS", s);
    },
    setCamera(x, y, rz) {
      this.base.style.setProperty("--viewX", x);
      this.base.style.setProperty("--viewY", y);
      this.base.style.setProperty("--viewRZ", rz);
    },
    setCameraFollow(sp) {
      this.follow = sp;
    },

    doFollow() {
      if (this.followOn) return;
      let followCD = 1000;
      this.followOn = true;
      let srz = this.follow.rz - (this.follow.rz % 4);
      eachFrame((_, ft) => {
        if (!this.followOn) return false;
        let r = followCD / 1000;
        followCD -= ft;
        let trz = this.follow.rz;
        this.setCamera(
          inter(r, this.follow.gx, this.camX),
          inter(r, this.follow.gy, this.camY),
          inter(r, trz, srz),
        );
        return true;
      });
    },
  };
  addSprites(map, ctls, text);
  mkWalls(map, text);

  return map;
};

const mkWalls = (map, text) => {
  const lines = text.replace(/[\^($@#V]/g, "─").split("\n");
  const numCols = Math.max(...lines.map((l) => l.length));
  const w = [];

  map.gridXF = numCols;
  map.gridYF = lines.length * 2;

  //set up width and height of board in grids
  map.base.style.setProperty("--gridXF", numCols);
  map.base.style.setProperty("--gridYF", lines.length * 2);

  //for each column create an element
  for (c = 0; c < numCols; c += 1) {
    const e = document.createElement("div");
    e.classList.add("wall");
    e.innerHTML = lines
      .map((l) => l[c] ?? " ")
      .join("\n")
      .replace(/[?&*↓→:~<>.]/g, "<span class=deco>$&</span>");
    map.base.appendChild(e);
    e.style.setProperty("--col", c);
    buildDepth(e, 5);
    w.push(e);
  }
  map.gCols = w;
  return w;
};

const mkGridRow = (l, top) => {
  let s = 1;
  let fs = 0;
  return [...l].map((c) => {
    if ((top && "│┤├└┘╯╰".includes(c)) || (!top && "│├┐┤┌╭╮".includes(c)))
      s = 1 - s;
    if ("▐▌".includes(c)) fs = 1 - fs;
    return s | (fs * 8);
  });
};

const mkGrid = (text) => {
  const lines = text.split("\n");
  const grid = lines.reduce(
    (a, l, i) => [...a, mkGridRow(l, true), mkGridRow(l, false)],
    [],
  );
  const mks = (x, y, v) => {
    grid[y][x] |= v;
  };
  lines.forEach((l, y) =>
    [...l].forEach((c, x) => {
      if ("╭╮╯╰".includes(c)) {
        //makes them all sticky in open space
        mks(x, y * 2, 2);
        mks(x, y * 2 + 1, 2);
        mks(x - 1, y * 2, 2);
        mks(x - 1, y * 2 + 1, 2);
      }
      if ("(".includes(c)) {
        //makes some bridge spaces
        mks(x, y * 2, 4);
        mks(x, y * 2 + 1, 4);
      }
    }),
  );
  return grid;
};

const addSprites = (map, ctls, text) => {
  const lines = text.split("\n");
  lines.forEach((l, y) =>
    [...l].forEach((c, x) => {
      //inside Codes
      let i = "$".includes(c) ? 1 : 0; //place it in the solid if you can
      if (map.g_solid(x, y * 2) ^ i)
        spriteFromCode(c, map, ctls, x, y * 2 + 1, 2);
      else spriteFromCode(c, map, ctls, x, y * 2);
    }),
  );
};

//HACK: DEBUG CODE ONLY
const addGridDisplay = (map) => {
  map.grid.forEach((r, y) => {
    r.forEach((v, x) => {
      const base = document.createElement("div");
      base.classList.add("marker");
      base.textContent = v + "{" + x + "," + y + "}";
      map.addA(base, x, y);
    });
  });
};
