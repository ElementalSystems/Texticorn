buildLevelMenu = (p, sl) => {
  return {
    update: () => {
      p.innerHTML = "";
      levs.forEach((l, i) => {
        const ctl = document.createElement("div");
        let allow = i == 0 || (loc[i - 1 + "p"] ?? 0) > 0;
        ctl.classList = "lev " + (allow ? "" : "lock");
        ctl.textContent = l.title;
        ctl.innerHTML = `${l.title}<div>${lastT(i)}</div>`;
        ctl.onclick = () => {
          snd.g();
          sl(i);
        };
        p.appendChild(ctl);
      });
    },
    show: () => {
      p.parentElement.style.display = "inherit";
      p.parentElement.classList.toggle("hide", false);
    },
    hide: () => {
      p.parentElement.classList.toggle("hide", true);
      setTimeout(() => (p.parentElement.style.display = "none"), 500);
    },
  };
};

buildScreen = () => {
  const menu = buildLevelMenu(document.getElementById("menui"), (li) => {
    document.documentElement.requestFullscreen();
    ctls.startUp(li);
    menu.hide();
  });
  menu.update();
  menu.show();

  const ctls = mkCtls(document.getElementById("ctls"), () => {
    menu.update();
    menu.show();
  });
};
