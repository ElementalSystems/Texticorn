mkCtl = (par, text) => {
  const c = {
    el: document.createElement("div"),
    down: 0,
  };
  c.el.textContent = text;
  c.el.classList.add("ctl");
  par.appendChild(c.el);

  const setActive = (v) => {
    c.el.classList.toggle("active", v);
    c.down = v;
  };

  c.el.addEventListener("pointerdown", (e) => {
    c.el.setPointerCapture(e.pointerId); // Captures release events even off-element
    setActive(true);
  });

  c.el.addEventListener("pointerup", () => setActive(false));

  // Revert if interaction is interrupted (e.g., system gesture, call, drag cancel)
  c.el.addEventListener("pointercancel", () => setActive(false));
  c.el.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  return c;
};

mkCtls = (par, endLevel) => {
  const buts = {
    ld: mkCtl(par, "LDown"),
    lu: mkCtl(par, "LUp"),
    l: mkCtl(par, "LEFT"),
    r: mkCtl(par, "RIGHT"),
    ru: mkCtl(par, "RUp"),
    rd: mkCtl(par, "RDown"),
  };

  const kmap = [
    {
      //special mappings if facing right
      b: [65, 37, "l", "lu", "ld"],
      f: [68, 39, "r"],
      u: [87, 38, "ru"],
      d: [83, 40, "rd"],
    },
    {
      //special mappings if facing left
      f: [65, 37, "l"],
      b: [68, 39, "r", "ru", "rd"],
      u: [87, 38, "lu"],
      d: [83, 40, "ld"],
    },
  ];
  //attach keyboard to parent
  par.onkeydown = function (e) {
    e = e || window.event;
    buts[e.keyCode] = {down: true};
  };
  par.onkeyup = function (e) {
    e = e || window.event;
    buts[e.keyCode] = {down: false};
  };
  par.focus();
  return {
    base: par,
    buts,
    przCount: 0,
    stTime: 0,
    down(i) {
      return !!this.buts[i]?.down;
    },
    anyDown(a) {
      return a.some((i) => this.down(i));
    },
    act(c, d) {
      return this.anyDown(kmap[d % 2][c]);
    },
    start(li) {
      this.base.focus();
      this.przCount = 0;
      this.stTime = Date.now();
      const map = mkMap(levs[li].map, this, document.getElementById("scene"));
      return map;
    },
    tkPrz() {
      this.przCount += 1;
    },
    end() {
      //TODO save best scores
      endLevel();
    },
  };
};
