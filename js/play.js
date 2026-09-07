//TODO: The List
/*
 * Design
 *  * Level design
 *    * 3 - harder
 *    * 4 - arena-like - round and round - inverts
 *    * 6 - huge and tricky - cruxiform (2)
 *  * Level menu and narrow screens
 *
 *
 *  * Sprites
 *
 * Map
 *
 * Technical
 *  * fix end of game running sprites
 *  * Speech bubble (control the curve text - no layers)
 *  * Sound
 *  * Mobile redraw issues and ZOOM (1)
 *
 * game/ctl
 *     - unlocking levels (3)
 *     - Bug for extra stars
 */

async function start() {
  buildScreen();
  //play(3);
  //showSprite(uni, "x");
}

function play(li) {
  const controls = mkCtls(document.getElementById("ctls"), () => 0);
  map = controls.startUp(li);
  //map.base.style.setProperty("--viewS", 0.25);
  addGridDisplay(map);
}

//HACK: Design time code only - remove
async function showSprite(config, mn) {
  const map = mkMap(
    {
      map: mapD,
      col: 2,
    },
    null,
    document.getElementById("scene"),
  );
  //addGridDisplay(map);
  //map.base.style.setProperty("--viewS", 0.75);
  map.setVPW(8);

  map.setCamera(4, 3, 0);
  config.bits[0].pos.forEach((_, i) => addSprite(config, map, i + 1, 1, 0, i));
  if (mn) {
    let t = addSprite(config, map);
    while (true) {
      t.setP(2, 4, 100, 0);
      let mns = mn.split(" ");
      for (let i = 0; i < mns.length; i += 1) await t.move(mns[i]);
    }
  }
}
