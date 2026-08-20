const makeLetters = (el, text, cb) => {
  const letters = text.split("");
  //for each letter, create a div element and append it to the element
  return letters.map((letter, i) => {
    const s = document.createElement("div");
    s.classList.add("letter");
    s.style.setProperty("--li", i);
    s.textContent = letter;
    el.appendChild(s);
    cb?.(s, letter, i, letters.length);
    return s;
  });
};

const updateCurveLetterPos = (el, t, [x1, y1, x2, y2, x3, y3, w1, w2, w3]) => {
  const u = 1 - t;
  const x = u * u * x1 + 2 * u * t * x2 + t * t * x3;
  const y = u * u * y1 + 2 * u * t * y2 + t * t * y3;
  const dx = 2 * u * (x2 - x1) + 2 * t * (x3 - x2);
  const dy = 2 * u * (y2 - y1) + 2 * t * (y3 - y2);
  const angle = Math.atan2(dy, dx);
  //these are not used yet but are the normalised normal vector
  const len = Math.hypot(dx, dy);
  const nx = len === 0 ? 0 : -dy / len;
  const ny = len === 0 ? 0 : dx / len;

  el.style.setProperty("--letX", x + "rem");
  el.style.setProperty("--letY", y + "rem");
  el.style.setProperty("--letRZ", angle + "rad");

  //Widths
  const w = t < 0.5 ? inter(t * 2, w1, w2, so) : inter(t * 2 - 1, w2, w3, si);
  el.style.setProperty("--letHS", w);
};

const mkAnimatedCurve = (c, parentEl, is = 0) => {
  c.pos.forEach((a) => fillFrom(c.pos[0], a)); //fill in extra pos numbers if we have to
  const ctl = document.createElement("div");
  ctl.classList.add(c.style);
  parentEl?.appendChild(ctl);
  const curve = {
    ctl: ctl,
    letters: makeLetters(ctl, c.text),
    pos: c.pos,
    state: is,
    position(pos) {
      this.letters.forEach((l, li) =>
        updateCurveLetterPos(
          l,
          clamp(0, 1, li / (this.letters.length - 1)),
          pos,
        ),
      );
    },
    positionR(r, os, ns, func) {
      this.position(interA(r, this.pos[os], this.pos[ns], func));
    },
  };
  curve.position(curve.pos[is]);
  return curve;
};
