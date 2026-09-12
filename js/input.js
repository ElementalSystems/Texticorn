mkCtl = (par, text, dn, up) => {
  const c = {
    el: document.createElement("div"),
    down: 0,
    dtime: 0,
    utime: 0,
    wasDown: 0,
  };
  c.el.textContent = text;
  c.el.classList.add("ctl");
  par.appendChild(c.el);

  const setActive = (v) => {
    c.el.classList.toggle("active", v);
    c.down = v;
    if (v) c.dtime = Date.now();
    else c.utime = Date.now();
  };

  c.el.addEventListener("pointerdown", (e) => {
    c.el.setPointerCapture(e.pointerId); // Captures release events even off-element
    setActive(true);
    dn?.();
  });

  c.el.addEventListener("pointerup", () => {
    setActive(false);
    up?.();
  });

  // Revert if interaction is interrupted (e.g., system gesture, call, drag cancel)
  c.el.addEventListener("pointercancel", () => setActive(false));
  c.el.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  return c;
};

mkCtls = (par, endLevel) => {
  const buts = {
    ld: mkCtl(par, "↙"),
    lu: mkCtl(par, "↖"),
    l: mkCtl(par, "←"),
    c: mkCtl(par, "☰", () => ctl.pause()),
    v: mkCtl(
      par,
      "⛶",
      () => ctl.showF(),
      () => ctl.hideF(),
    ),
    r: mkCtl(par, "→"),
    ru: mkCtl(par, "↗"),
    rd: mkCtl(par, "↘"),
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
    buts[e.keyCode] = {
      ...buts[e.keyCode],
      down: true,
      dtime: Date.now(),
    };
  };
  par.onkeyup = function (e) {
    e = e || window.event;
    buts[e.keyCode] = {
      ...buts[e.keyCode],
      down: false,
      utime: Date.now(),
    };
  };
  par.focus();
  const ctl = {
    base: par,
    topbar: document.getElementById("topbar"),
    buts,
    cli: 0,
    przCount: 0,
    stTime: 0,
    time: 0,
    wasDownTime: 0,
    timerOn: false,
    status: 0, //new level
    down(i) {
      return !!(this.buts[i]?.down || this.buts[i]?.wasDown);
    },
    anyDown(a) {
      return a.some((i) => this.down(i));
    },
    setWasDown() {
      //first check through them hoping for a currently active
      let bl = [
        65,
        37,
        "l",
        "lu",
        "ld",
        68,
        39,
        "r",
        87,
        38,
        "ru",
        83,
        40,
        "rd",
      ];
      let dc = 0,
        maxt = 0,
        maxi = "";
      bl.forEach((i) => {
        let b = this.buts[i];
        if (!b) return;
        if (b.down) {
          b.wasDown = true;
          dc += 1;
        } else {
          b.wasDown = false;
          if (b.utime > maxt) {
            maxt = b.utime;
            maxi = i;
          }
        }
      });
      if (!dc && maxt > this.wasDownTime + 100) this.buts[maxi].wasDown = true; //if nothing is currently down look at the last one
      this.wasDownTime = Date.now();
    },

    act(c, d) {
      return this.anyDown(kmap[d % 2][c]);
    },
    startUp(li) {
      document.getElementById("tl1").textContent = "<" + levs[li].time1 + "s";
      document.getElementById("tl2").textContent = "<" + levs[li].time2 + "s";
      document.getElementById("title").textContent = levs[li].title;
      this.cli = li;
      this.status = 0;
      pChimes(levs[li].m);
      return this.start();
    },

    start(go) {
      document.getElementById("bst").textContent = lastT(this.cli);
      document.getElementById("scene").innerHTML = "";
      this.status = 0; //new game
      if (this.map) this.map.isDead = 1;
      this.map = mkMap(levs[this.cli], this, document.getElementById("scene"));
      this.przCount = 0;
      this.stTime = Date.now();
      this.time = 0;
      if (go) this.cont();
      else this.pause();
      return this.map;
    },
    updateTB() {
      if (this.timerOn) this.time += (Date.now() - this.stTime) / 1000;
      this.stTime = Date.now();
      for (let i = 0; i < 5; i += 1) {
        document
          .getElementById("s" + i)
          .classList.toggle("set", this.przCount > i);
      }
      document.getElementById("time").textContent = this.time.toFixed(1) + "s";
      document.getElementById("C_C").classList.toggle("a", this.status == 1);
      document.getElementById("C_S").classList.toggle("a", this.status == 0);
      document.getElementById("C_R").classList.toggle("a", this.status != 0);
      document.getElementById("C_N").classList.toggle("a", this.status == 2);
    },
    tkPrz() {
      this.przCount += 1;
    },
    showF() {
      this.timerOn = false;
      this.updateTB();
      this.base.classList.toggle("hide", true);
      this.topbar.classList.toggle("hide", true);
      this.map.lookAt(this.map.gridXF / 2, this.map.gridYF / 2);
      this.map.setVPW(this.map.gridYF + 3);
    },
    hideF() {
      this.timerOn = true;
      this.updateTB();
      this.base.focus();
      this.topbar.classList.toggle("closed", true);
      this.topbar.classList.toggle("hide", false);
      this.base.classList.toggle("hide", false);
      this.map.setVPW(6);
      this.map.doFollow();
    },
    pause() {
      this.timerOn = false;
      this.updateTB();
      this.topbar.classList.toggle("closed", false);
      this.base.classList.toggle("disable", true);
      this.map.base.classList.toggle("paused", true);
      this.map.lookAt(this.map.gridXF / 2, this.map.gridYF / 2);
      this.map.setVPW(this.map.gridYF + 2);
    },
    cont() {
      this.status = 1;
      this.timerOn = true;
      this.updateTB();
      this.base.focus();
      this.topbar.classList.toggle("closed", true);
      this.base.classList.toggle("disable", false);
      this.map.base.classList.toggle("paused", false);
      this.map.setVPW(6);
      this.map.doFollow();
    },
    exit() {
      pChimes();
      endLevel();
    },
    end() {
      //freeze and unzoom the camera
      if (this.przCount >= 3) {
        if (this.time < levs[this.cli].time1) this.przCount += 1;
        if (this.time < levs[this.cli].time2) this.przCount += 1;
      }
      this.status = 2; //done
      this.timerOn = false;
      this.updateTB();
      this.topbar.classList.toggle("closed", false);
      this.base.classList.toggle("disable", true);
      this.map.lookAt(this.map.follow.gx, this.map.follow.gy + 2);
      this.map.setVPW(6);
      if (this.przCount >= 3) {
        if ((loc[this.cli + "t"] ?? 10000) > this.time)
          loc[this.cli + "t"] = this.time;
      }
      if ((loc[this.cli + "p"] ?? 0) < this.przCount)
        loc[this.cli + "p"] = this.przCount;
      saveLoc();
    },
  };
  //launch score board and timer updater.
  everyX(100, () => {
    ctl.updateTB();
    return true;
  });
  //bind the button handlers
  document.getElementById("C_C").onclick = () => ctl.cont();
  document.getElementById("C_S").onclick = () => ctl.cont();
  document.getElementById("C_R").onclick = () => ctl.start(1);
  document.getElementById("C_X").onclick = () => ctl.exit();
  document.getElementById("C_N").onclick = () => ctl.startUp(ctl.cli + 1);

  return ctl;
};
