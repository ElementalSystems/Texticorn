//TODO: The List
/*
 * Design
 *  * Level design
 *    * 3 - harder
 *    * 4 - arena-like - round and round - invert
 *    * 5 - more complex
 *    * 6 - huge and tricky
 *  * Sprites
 *      color unicorn (1)
 *      Make stars
 *      fix flips
 *
 * Map\
 *
 * Technical
 *  * End of Level thing
 *  * Speech bubble (control the curve text - no layers)
 *  * Sound
 *
 *
 * game/ctl

 *     - local storage - unlocking levels
 */

async function start() {
  buildScreen();
  //play(1);

  //showSprite(uni, "fd tb fd tb u2 tb d2 fd");
}

function play(li) {
  const controls = mkCtls(document.getElementById("ctls"), () => 0);
  map = controls.startUp(li);
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
