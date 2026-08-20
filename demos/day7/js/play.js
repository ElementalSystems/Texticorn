//Stuff worth doing
/*
 *  set up repo
 *  consider pan and zoom and map handling
 *  Build World grid array for dynamics. (1)
 *     * build array (XOS)
 *     * Array Visualiser as anchors
 *  Sprite:
 *    calc future position at start of move from last move bit
 *    add visual depth
 *    z-offset on legs
 *    Create reverse legs?
 */

async function start() {
  //build avatar
  //let t = mkAnimatedCurve(tail);
  // t.letters.forEach((l) => buildA_B(l, 2));

  const map = mkMap(map1, document.getElementById("scene"));
  addGridDisplay(map);
  //map.addA(t.ctl);

  let t = addSprite(uni, map, 0, 3);

  while (true) {
    await t.move("fd");
    map.scene.style.setProperty("--viewS", 0.5);
    map.scene.style.setProperty("--viewY", -10);
    map.scene.style.setProperty("--viewX", -10);
    await t.move("fd");
    await t.move("ru");
    map.scene.style.setProperty("--viewS", 0.25);
    await t.move("fd");
    await t.move("ru");
    await t.move("fd");
    map.scene.style.setProperty("--viewS", 1);
    await t.move("fd");
    await t.move("tb");

    //map.scene.style.setProperty("--viewX", -60);
    //await t.move("jf");
    //map.scene.style.setProperty("--viewY", -30);
    //map.scene.style.setProperty("--viewS", 1);

    //await t.animateToState(1, 500, siso);
    //await t.animateToState(0, 500, siso);
  }
}
