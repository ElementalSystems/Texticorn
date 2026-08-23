mkCtl = (par, text) => {
  const el = document.createElement("div");
  el.innerHTML = text;
  el.classList.add("ctl");
  par.appendChild(el);

  const setActive = (v) => {
    el.classList.toggle("active", v);
  };

  el.addEventListener("pointerdown", (e) => {
    el.setPointerCapture(e.pointerId); // Captures release events even off-element
    setActive(true);
  });

  el.addEventListener("pointerup", () => setActive(false));

  // Revert if interaction is interrupted (e.g., system gesture, call, drag cancel)
  el.addEventListener("pointercancel", () => setActive(false));
  el.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  return el;
};

//Stuff worth doing
/*
 *  Control surfaces
 *   * Make and test
 *
 *  Sprite:
 *    calc future position at start of move from last move bit
 *    z-offset on legs
 *    Create reverse legs?
 */

async function start() {
  const map = mkMap(map1, document.getElementById("scene"));
  addGridDisplay(map);

  let t = addSprite(uni, map, 1, 10);
  map.setCameraFollow(t);
  mkCtl(document.getElementById("ctls"), "LEFT");
  mkCtl(document.getElementById("ctls"), "JUMP");
  mkCtl(document.getElementById("ctls"), "RIGHT");

  while (true) {
    await t.move("fd");
    map.base.style.setProperty("--viewS", 0.25);

    await t.move("fd");
    await t.move("fd");
    await t.move("dd");
    await t.move("tb");
    await t.move("fd");
    await t.move("tb");
    await t.move("ju");

    await t.move("rd");
    await t.move("fd");
    await t.move("tb");
    await t.move("fd");
    await t.move("jf");
    await t.move("fd");
    await t.move("tb");
    await t.move("fd");
    await t.move("rd");
    await t.move("fd");
    await t.move("fd");
    await t.move("jf");

    //map.base.style.setProperty("--viewS", 0.5);
    //map.base.style.setProperty("--viewY", 5);
    //map.base.style.setProperty("--viewX", 5);
    //map.base.style.setProperty("--viewS", 2);
    await t.move("fd");
    await t.move("ru");
    await t.move("fd");
    await t.move("ru");
    //map.base.style.setProperty("--viewY", 10);
    //map.base.style.setProperty("--viewX", 10);
    //map.base.style.setProperty("--viewS", 0.5);
  }
}
