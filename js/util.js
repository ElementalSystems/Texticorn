//interpolation, curves and clamping
const siso = (r) => 3 * r * r - 2 * r * r * r;
const so = (r) => 2 * r - r * r;
const si = (r) => r * r;
const id = (r) => r;

const clamp = (s, e, v) => (v < s ? s : v > e ? e : v);
const inter = (r, st, end, func = id) => {
  r = func(clamp(0, 1, r));
  return r * end + (1 - r) * st;
};

rnd = (s, e) => s + ((Math.random() * (e - s + 1)) | 0);
randA = (a) => a[Math.floor(Math.random() * a.length)]; //select a random element of array
ranR = (s, e) => s + Math.random() * (e - s); //random in range s to e smooth

//array handling
const fillFrom = (s, t) => s.forEach((v, i) => (t[i] = t[i] ?? s[i]));
const fillUp = (arr, x, y) => Array.from({length: x}, (_, i) => arr[i] ?? y);
const interA = (r, st, end, func) =>
  st.map((_, i) => inter(r, st[i], end[i], func)); //like inter across each element in an array

//weird quick directional things
const dirX = (d) => (d % 2 ? (d % 4 == 1 ? 1 : -1) : 0);
const dirY = (d) => (d % 2 ? 0 : d % 4 == 0 ? 1 : -1);

//frame runners

//call each frame
var _onFrameList = [];
var _lastFrameT = 0;
const onFrame = (f) => _onFrameList.push(f);

const frame = (t) => {
  if (!_lastFrameT) _lastFrameT = t - 10;
  const ft = t - _lastFrameT;
  _lastFrameT = t;
  const ofl = _onFrameList;
  _onFrameList = [];
  ofl.forEach((f) => f(t, ft));
  requestAnimationFrame(frame);
};

requestAnimationFrame(frame);

animateOver = (time, each, end) => {
  var startTime = 0;
  var endTime = 0;
  return new Promise((resolve, reject) => {
    const func = (t, ft) => {
      if (!startTime) {
        startTime = t;
        endTime = t + time;
      }
      var r = clamp(0, 1, (t - startTime) / time);
      each(r, t, ft);
      if (r < 1) onFrame(func);
      else {
        if (end) end();
        resolve();
      }
    };
    onFrame(func); //call it the first time
  });
};

eachFrame = (on) => {
  const func = (t, ft) => {
    if (on(t, ft)) onFrame(func);
  };
  onFrame(func); //call it the first time
};

everyX = (time, on) => {
  const func = (t, ft) => {
    if (on(t, ft)) setTimeout(func, time);
  };
  func(); //call it the first time
};

//local storage
loc = JSON.parse(localStorage.getItem("Glyphicon") ?? "{}");
saveLoc = () => {
  localStorage.setItem("Glyphicon", JSON.stringify(loc));
};

//Text builders
lastT = (li) => {
  let ps = loc[li + "p"] ?? 0;
  return (
    "★".repeat(ps) +
    "☆".repeat(5 - ps) +
    (ps >= 3 ? " (" + (loc[li + "t"] ?? 1000).toFixed(1) + "s)" : "")
  );
};
