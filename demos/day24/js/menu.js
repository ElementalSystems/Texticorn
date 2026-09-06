buildLevelMenu = (p, sl) => {
  levs.forEach((l, i) => {
    const ctl = document.createElement("div");
    ctl.classList = "lev";
    ctl.textContent = l.title;
    ctl.innerHTML = `${l.title}<div>${lastT(i)}</div>`;
    ctl.onclick = () => {
      sl(i);
    };
    p.appendChild(ctl);
  });
  return {
    show: () => p.classList.toggle("hide", false),
    hide: () => p.classList.toggle("hide", true),
  };
};

buildScreen = () => {
  const menu = buildLevelMenu(document.getElementById("menu"), (li) => {
    ctls.startUp(li);
    menu.hide();
  });
  menu.show();

  const ctls = mkCtls(document.getElementById("ctls"), () => {
    //end of game status
    menu.show();
  });
};
