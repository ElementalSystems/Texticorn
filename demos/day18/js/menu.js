buildLevelMenu = () => {
  const p = document.getElementById("menu");
  levs.forEach((l, i) => {
    const ctl = document.createElement("div");
    ctl.classList = "lev";
    ctl.textContent = l.title;
    ctl.onclick = () => {
      console.log("Selected level", i, l.title);
      // TODO: replace with actual level start logic
    };
    p.appendChild(ctl);
  });
};
