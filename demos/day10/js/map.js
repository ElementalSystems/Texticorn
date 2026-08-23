const mkMap = (text, parentEl, layers = 10) => {
  const base = document.createElement("pre");
  base.classList.add("map");
  base.textContent = text;
  parentEl.appendChild(base);
  return {
    base,
    scene: parentEl,
    grid: mkGrid(text),
    layers: buildDepth(base, layers),

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
      eachFrame(() => {
        this.setCamera(sp.gx, sp.gy, sp.rz);
        return true;
      });
    },
  };
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
  return lines.reduce(
    (a, l, i) => [...a, mkGridRow(l, true), mkGridRow(l, false)],
    [],
  );
};

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
