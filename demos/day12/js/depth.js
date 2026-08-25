const buildDepth = (el, layers) => {
  const content = el.innerHTML;
  el.innerHTML = "";
  const base = document.createElement("div");
  base.innerHTML = content;
  el.appendChild(base);
  base.classList.add("base");
  return [...Array(layers)].map((_, i) => {
    const span = document.createElement("div");
    span.innerHTML = content;
    span.style.setProperty("--i", i / layers);
    span.classList.add("dlayer");
    base.appendChild(span);
    return span;
  });
};

const buildA_B = (el, num) => {
  //builds num layer above and a layer below to thicken the object
  const content = el.innerHTML;
  el.innerHTML = "";
  const base = document.createElement("div");
  base.innerHTML = content;
  el.appendChild(base);
  base.classList.add("base", "AB");
  [...Array(num)].forEach((_, i) => {
    const e1 = document.createElement("div");
    e1.innerHTML = content;
    e1.style.setProperty("--i", (i + 1) / num / 2);
    e1.classList.add("dlayer", "AB");
    base.appendChild(e1);
    const e2 = document.createElement("div");
    e2.innerHTML = content;
    e2.style.setProperty("--i", -(i + 1) / num / 2);
    e2.classList.add("dlayer", "AB");
    base.appendChild(e2);
  });
};
