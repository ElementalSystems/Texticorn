//Stuff worth doing
/*
 *  design
 *    * more unicorn
 *
 *  other objects
 *     - Bridges
 *
 *  Map
 *   * fix android issue!
 *   * work the curves system better for inversions (1)
 *
 *  Sprite:
 *    z-offset on legs
 *    speech bubble (control the curve text - no layers)
 */

async function start() {
  const controls = mkCtls(document.getElementById("ctls"));
  play(map1, controls);

  //showSprite(ext, "i");
}

function play(mapC, controls) {
  const map = mkMap(mapC, controls, document.getElementById("scene"));
  //map.base.style.setProperty("--viewS", 0.25);
  addGridDisplay(map);
}

//HACK: Design time code only - remove
async function showSprite(config, mn) {
  const map = mkMap(mapD, null, document.getElementById("scene"));
  addGridDisplay(map);
  map.setCamera(3, 3, 0);
  config.bits[0].pos.forEach((_, i) => addSprite(config, map, i + 1, 2, 0, i));
  if (mn) {
    let t = addSprite(config, map, 1, 4);
    while (true) {
      t.setP(1, 4, 100, 0);
      await t.move(mn);
    }
  }
}
