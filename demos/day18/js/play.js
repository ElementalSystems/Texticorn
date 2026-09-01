//TODO: The List
/*
 * Design
 *  * Level design
 *    * 1 - Intro Jumps and controls and curves - prizes and exit (3)
 *    * 2 - The flip side and the solid bits
 *
 *  * more unicorn
 *   * moves (and check empty spaces) (1)
 *
 * Map
 *
 * Technical
 *  * arch 3d thing (2)
 *  * speech bubble (control the curve text - no layers)
 *
 *
 * game
 *   create level object 
 *     - start level 
 *     - colour set up 
 *     - 
 
 */

async function start() {
  //buildLevelMenu();

  const controls = mkCtls(document.getElementById("ctls"));
  play(myMap, controls);

  //showSprite(uni, "fd tb fd tb u2 tb d2 fd");
}

function play(mapC, controls) {
  const map = mkMap(mapC, controls, document.getElementById("scene"));
  //map.base.style.setProperty("--viewS", 0.25);
  addGridDisplay(map);
}

//HACK: Design time code only - remove
async function showSprite(config, mn) {
  const map = mkMap(mapD, null, document.getElementById("scene"));
  //addGridDisplay(map);
  map.base.style.setProperty("--viewS", 0.75);

  map.setCamera(4, 3, 0);
  config.bits[0].pos.forEach((_, i) => addSprite(config, map, i + 1, 1, 0, i));
  if (mn) {
    let t = addSprite(config, map, 1, 1);
    while (true) {
      t.setP(1, 2, 100, 0);
      let mns = mn.split(" ");
      for (let i = 0; i < mns.length; i += 1) await t.move(mns[i]);
    }
  }
}
