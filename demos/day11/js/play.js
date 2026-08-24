//Stuff worth doing
/*
 *  config for sprite design (1)
 *
 *  other objects
 *     - Prizes
 *     - Bridges
 *     - Exit!
 *
 *  Map
 *   * fix android issue!
 *
 *  Sprite:
 *    interuptable idle?
 *    calc future position at start of move from last move bit???
 *    z-offset on legs
 *    Create reverse legs?
 *    speech bubble
 */

async function start() {
  const controls = mkCtls(document.getElementById("ctls"));
  play(controls);
  //let t = addUni(map, controls, 1, 10);
  //map.setCameraFollow(t);
  /*
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
    */
}

function play(controls) {
  const map = mkMap(map1, controls, document.getElementById("scene"));
  addGridDisplay(map);
}

function showSprite() {
  const map = mkMap(mapD, controls, document.getElementById("scene"));
  addGridDisplay(map);
}
