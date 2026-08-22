const followSp = (sp, map) => {
  eachFrame(() => {
    console.log("Playing", sp.gx, sp.gy);
    map.base.style.setProperty("--viewX", sp.gx);
    map.base.style.setProperty("--viewY", sp.gy);
    map.base.style.setProperty("--viewRZ", sp.rz);
    return true;
  });
};

//Stuff worth doing
/*
 *
 *
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
  followSp(t, map);

  while (true) {
    await t.move("fd");
    map.base.style.setProperty("--viewS", 0.25);

    await t.move("fd");
    await t.move("fd");
    await t.move("jf");
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
