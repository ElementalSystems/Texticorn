const mkMap = (text, ctls, parentEl, layers = 5) => {
  const base = document.createElement("pre");
  base.classList.add("map");
  base.textContent = text.replace(/[\^(@#]/g, "─");
  parentEl.appendChild(base);
  const map = {
    base,
    scene: parentEl,
    grid: mkGrid(text),
    layers: buildDepth(base, layers),
    follow: null,

    g_state(x, y) {
      return this.grid[y][x];
    },
    g_solid(x, y) {
      return this.g_state(x, y) & 1;
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
    setCamera(x, y, rz) {
      this.base.style.setProperty("--viewX", x);
      this.base.style.setProperty("--viewY", y);
      this.base.style.setProperty("--viewRZ", rz);
    },
    setCameraFollow(sp) {
      this.follow = sp;
      eachFrame(() => {
        this.setCamera(sp.gx, sp.gy, sp.rz);
        return this.follow;
      });
    },
  };
  addSprites(map, ctls, text);
  return map;
};

const mkGridRow = (l, top) => {
  let s = 1;
  return [...l].map((c) => {
    if ((top && "│└┘╯╰".includes(c)) || (!top && "│┐┌╭╮".includes(c)))
      s = 1 - s;
    return s;
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
      if (map.g_solid(x, y * 2)) spriteFromCode(c, map, ctls, x, y * 2 + 1, 2);
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
