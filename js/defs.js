const uni = {
  style: "uni",
  bits: [
    {
      text: "⦅GLYPH⦆",
      style: "bd",
      layers: 2,
      pos: [
        [-2, 0, 0, 0, 2, 0, 1.2, 0.8, 1.5], //stand
        [, , 0, -0.2, , , 1], //stand (alt)
        [-2.5, 2, -3, 0], //rear
        [-2.5, , , , 2.5], //spread
        [-2.5, , , , 2.5], //spread (alt)
        [, , , , , 2, 2], //land
        [, 0.5, , , , -0.25], //trot
        [, -0.5, , , , 0.25], //trot (alt)
        [, , , -2], //legs together
        [, 1, , 1, 0.5, 1], //deny
      ],
    },
    {
      text: "ICORN⟫^°>>≍",
      style: "head",
      layers: 1,
      pos: [
        [2, 0, 3, -4, 5, -2, 0.2, 2, 1], //stand
        [, , 2, , , -3], //stand alt
        [, , 1, , 4, -5], //rear
        [, , , -3], //spread
        [, , 2, -3], //spread alt
        [2, 2, 4, 0, 5, 2], //land
        [, , 4, -4], //trot
        [, , 4, -4], //trot alt
        [], //legs together
        [0, 1, 2, 0, 3, 2], //deny
      ],
    },
    {
      text: "○≡≡≡≡○====>>",
      style: "limb f rear",
      layers: 1,
      pos: [
        [-1, 0, -4, 0, -2, 4.5, 1, 1, 1], //stand
        [, , , , -1.5, 4], //alt stand
        [-3, 2, -5, 4, -1],
        [-2, 0, , 3, -6, 2], //spread
        [-2, 0, , 2, -6, 1], //spread (alt)
        [-2, 0, , 3, -6, -1], //land
        [, , , , -1], //trot
        [, , , , -5], //trot (alt)
        [, , , , 0], //legs together
        [-2, 1, , -1], //deny
      ],
    },
    {
      text: "○≡≡≡≡○====>>",
      style: "limb b rear",
      layers: 1,
      pos: [
        [-1, 0, -4, 0, -2.2, 4, 1, 1, 1], //stand
        [, , , , -2, 4.5], //alt stand
        [-3, 2, -5, 4, -1], //rear
        [-2, 0, , 4, -6, 3], //spread
        [-2, 0, , 4, -6, 1], //spread (alt)
        [-2, 0, , 5, -6, -0.5], //land
        [, , , , -5], //trot
        [, , , , -1], //trot (alt)
        [, , , , 0], //legs together
        [-2, 1, , -1], //deny
      ],
    },
    {
      text: "○≡≡≡≡○====>>",
      style: "limb f front",
      layers: 1,
      pos: [
        [2, 0, 4, 3, 2, 4, 1, 1, 1], //stand
        [, , 3, , , 4.5], //stand alt
        [, , , -2, 4, 2], //rear
        [, , , 0, 6, 1], //spread
        [, , , 0, 6, 1.5], //spread alt
        [2, 2, , , , 5], //land
        [, , , , 5], //trot
        [, , , , 1], //trot alt
        [, , , , 0], //legs together
        [0, 1], //deny
      ],
    },
    {
      text: "○≡≡≡≡○====>>",
      style: "limb b front",
      layers: 1,
      pos: [
        [2, 0, 3, 3, 2, 4.5, 1, 1, 1], //stand
        [, , 4, , , 4], //stand alt
        [, , , -2, 4, 2], //rear
        [, , , 0, 6, 2], //spread
        [, , , 0, 6, 1], //spread (alt)
        [2, 2, , , 1, 5], //land
        [, , , , 1], //trot
        [, , , , 5], //trot (alt)
        [, , , , 0], //legs together
        [0, 1], //deny
      ],
    },
    {
      text: "LOVE#",
      style: "horn",
      layers: 0,
      pos: [
        [4.5, -3.5, 5, -4, 6, -5, 1, 0.5, 0.1], //stand
        [4, -4, 4.5, -5, 5, -6], //stand alt
        [3, -5, 3, -5, 2.5, -7], //rear
        [4.5, -3, , , 5.5], //spread
        [4.5, -3, , , 5.5], //spread (alt)
        [5, 1, 6, 0, 7, -2], //land
        [5, -3, 6, -4, 7, -5], //trot
        [5, -3, 6, -4, 7, -5], //trot (alt)
        [], //legs together
        [3, 1, 3.5, 1, 5, 0], //deny
      ],
    },
    {
      text: "<<TAIL##",
      style: "tail rbow",
      layers: 1,
      pos: [
        [-3, -3, -1, -2, -2, -1, 0.2, 1, 0.5], //stand
        [-2, , -3], //stand alt
        [-6, 3, -5, 4, -4, 3], //rear
        [-5, -1, -4, 1, -2.5, -1], //spread
        [-5, 0, -3, -2, -2.5, -1], //spread (alt)
        [-2], //land
        [-5, 0, -3, -2], //trot
        [-5, -2, -3, 0], //trot alt
        [, , -2], //legs together
        [-4, 4, -3, 1, -3, 1.5], //deny
      ],
    },
  ],
  moves: {
    1: [
      //idle
      {t: 300, ts: 1},
    ],
    2: [
      //idle
      {t: 400, ts: 0},
    ],
    3: [
      //idle
      {t: 200, ts: 8, tx: 0.02, ty: 0.02},
      {t: 100, ts: 8, tx: 0, ty: 0},
    ],
    i: [
      //idle
      {t: 500, ts: 9, sVP: 15},
    ],
    p: [
      //game paused
      {t: 100, ts: 1},
    ],
    fd: [
      {t: 250, ts: 6, tx: 0.25, sVP: 6, sS: "t", sSt: 1000},
      {t: 250, ts: 1, tx: 0.5},
      {t: 250, ts: 7, tx: 0.75},
      {t: 250, ts: 0, tx: 1},
    ],
    j2: [
      {t: 600, ts: 2, tx: 0},
      {t: 300, ts: 3, tx: 0.5, ty: -0.3},
      {t: 300, ts: 4, tx: 1, ty: -0.4},
      {t: 600, ts: 5, tx: 1.7, ty: 0},
      {t: 200, ts: 8, tx: 2, ty: 0, sS: "g", sSt: 400},
    ],
    j3: [
      {t: 700, ts: 2, tx: 0},
      {t: 300, ts: 3, tx: 0.5, ty: -0.3, sS: "w", sSt: 1000},
      {t: 300, ts: 4, tx: 1.3, ty: -0.4},
      {t: 300, ts: 3, tx: 2, ty: -0.5},
      {t: 600, ts: 5, tx: 2.7, ty: -0.3},
      {t: 400, ts: 8, tx: 3, ty: 0, sS: "g", sSt: 400},
    ],
    ru: [
      {t: 200, ts: 2, trz: 0},
      {t: 300, ts: 1, trz: 0.5, sS: "t"},
      {t: 200, ts: 5, trz: 1},
    ],
    rd: [
      {t: 600, ts: 5, tx: 0.7, ty: 0.33, trz: 0, sS: "t"},
      {t: 800, ts: 8, tx: 0.9, ty: 0.66, trz: -0.5},
      {t: 600, ts: 0, tx: 1, ty: 1, trz: -1, sS: "t"},
    ],
    tb: [
      {t: 300, ts: 2, try: 0.25, sVP: 6},
      {t: 300, ts: 2, try: 0.5},
      {t: 300, ts: 2, try: 0.75},
      {t: 300, ts: 0, try: 1},
    ],
    d1: [
      {t: 600, ts: 8, tx: 0.5},
      {t: 600, ts: 5, tx: 1, ty: 0.6, trz: -0.5},
      {t: 600, ts: 4, tx: 1, ty: 1, trz: -0.5},
      {t: 100, ts: 1, tx: 1, ty: 1, trz: 0, sS: "g", sSt: 400},
    ],
    d1l: [
      {t: 400, ts: 8, tx: 0.5},
      {t: 400, ts: 5, tx: 1, ty: 0.3},
      {t: 400, ts: 3, tx: 1.5, ty: 0.5, trz: -0.5},
      {t: 400, ts: 4, tx: 2, ty: 1, trz: -0.5},
      {t: 400, ts: 1, tx: 2, ty: 1, trz: 0, sS: "g", sSt: 400},
    ],
    d2: [
      {t: 400, ts: 8, tx: 0.5},
      {t: 800, ts: 5, tx: 1, ty: 0.6, trz: -0.3},
      {t: 800, ts: 4, tx: 1.6, ty: 2, trz: -0.3},
      {t: 200, ts: 1, tx: 2, ty: 2, trz: 0, sS: "g", sSt: 400},
    ],
    d3: [
      {t: 400, ts: 8, tx: 0.5},
      {t: 500, ts: 5, tx: 1, ty: 0.6, trz: -0.3},
      {t: 800, ts: 4, tx: 1.3, ty: 1.3, trz: -0.4},
      {t: 800, ts: 3, tx: 1.6, ty: 3, trz: -0.4},
      {t: 400, ts: 5, tx: 2, ty: 3, trz: 0, sS: "g", sSt: 400},
    ],
    u2: [
      {t: 800, ts: 2, trz: 0.2},
      {t: 500, ts: 4, ty: -0.3, tx: 0.2, trz: 0.7, sS: "o"},
      {t: 1000, ts: 3, ty: -2.2, tx: 1, trz: 0.2},
      {t: 500, ts: 5, ty: -2, tx: 1.8, trz: 0},
      {t: 200, ts: 8, ty: -2, tx: 2, sS: "g", sSt: 400},
    ],
    u1: [
      {t: 300, ts: 2, tx: -0.3, trz: 0.2},
      {t: 500, ts: 3, ty: -0.4, tx: -0.1, trz: 0.4, sS: "o"},
      {t: 500, ts: 5, ty: -1, tx: 0.4, trz: 0.2},
      {t: 200, ts: 8, ty: -1, tx: 1, trz: 0, sS: "g", sSt: 400},
    ],
    u1l: [
      {t: 400, ts: 2, tx: -0.3},
      {t: 600, ts: 3, ty: -0.4, tx: 0.5, trz: 0.5, sS: "o"},
      {t: 600, ts: 4, ty: -1.2, tx: 1.4, trz: 0.2},
      {t: 200, ts: 8, ty: -1, tx: 2, trz: 0, sS: "g", sSt: 400},
    ],

    f: [
      {t: 500, ts: 2, try: 0.2, sZ: 0.3},
      {t: 800, ts: 4, tx: 0.5, ty: 0.5, try: 0.4, sZ: 0.6, sS: "w", sSt: 2000},
      {
        t: 800,
        ts: 3,
        tx: 1,
        ty: 1,
        trz: 1.5,
        try: 0.6,
        sZ: 0.8,
        sS: "w",
        sSt: 2000,
      },
      {t: 200, ts: 8, tx: 1, ty: 1, trz: 2, try: 1, sZ: 0.5},
      {t: 500, ts: 1, tx: 1, ty: 1, trz: 2, try: 1, sZ: 0, tf: 1},
    ],
    x: [
      {t: 1000, ts: 2, trz: 0, sZ: 0.3, sS: "w", sSt: 3000},
      {t: 500, ts: 4, ty: 1, trz: -1, sZ: 0.6},
      {t: 500, ts: 3, ty: 3, trz: -1, sZ: 0.8, sS: "w", sSt: 2000},
      {t: 500, ts: 4, ty: 6, trz: -1, sZ: 1},
    ],
    ux: [
      //up deny
      {t: 500, ts: 2, tx: -0.3, sVP: 9},
      {t: 800, ts: 9, tx: -0.1, sS: "n", sSt: 800},
      {t: 200, ts: 1, tx: 0},
    ],
    dx: [
      //down deny
      {t: 500, ts: 5, tx: 0.3, sVP: 9},
      {t: 200, ts: 9, tx: 0.1, sS: "n", sSt: 800},
      {t: 400, ts: 9, tx: 0.1},
      {t: 200, ts: 1, tx: 0},
    ],
    fx: [
      {t: 200, ts: 1, tx: 0.3, sVP: 9},
      {t: 200, ts: 9, tx: 0.1, sS: "n", sSt: 800},
      {t: 400, ts: 9, tx: 0.1},
      {t: 200, ts: 1, tx: 0},
    ],
  },
};

const prz = {
  style: "prz",
  bits: [
    {
      text: "★PRIZE★",
      style: "rbow",
      layers: 0,
      pos: [
        [-3, 2, 0, 2, 3, 2, 1, 1, 1],
        [, , , , , , 1, 2, 1],
        [, , , , , , 2, 2, 2],
        [, , , , , , 6, 6, 6],
      ],
    },
    {
      text: "!!Mac--",
      style: "c",
      layers: 0,
      pos: [
        [-3, 1, 0, -1, 3, 1, 1, 1, 2],
        [, , , , , , 1, 2, 1],
        [, , , 0, , , 2, 2, 2],
        [],
      ],
    },
    {
      text: "Guffin",
      style: "c",
      layers: 0,
      pos: [
        [3, 3, 0, 5, -3, 3, 1, 1, 1],
        [, , , , , , 1, 2, 1],
        [, , , 4, , , 2, 2, 2],
        [],
      ],
    },
  ],
  moves: {
    1: [{t: 100, ts: 0, try: 0.05}],
    2: [{t: 100, ts: 1, try: 0.1}],
    3: [{t: 100, ts: 2, try: 0.15}],
    f: [
      {
        t: 1000,
        try: 2,
        ts: 3,
        ty: -1,
      },
      {
        t: 3000,
        try: 6,
        ts: 0,
        ty: -6,
      },
      {
        t: 100,
        ts: 0,
        try: 0,
        ty: -50,
      },
    ],
  },
};

const brg = {
  style: "brg arch",
  bits: [
    {
      text: "➤FLIP➤➤FLIP➤",
      style: "m",
      layers: 1,
      pos: [
        [3, -3, 3, -2, 3, 12, 1, 1, 1],
        [, , , 3],
        [, , , 6],
      ],
    },
    {
      text: "➤FLIP➤➤FLIP➤",
      style: "m",
      layers: 1,
      pos: [
        [-3, 12, -3, 6, -3, -3, 1, 1, 1],
        [, , , 0],
        [, , , -2],
      ],
    },
  ],
  moves: {
    i: [
      //idle
      {t: 500, ts: 1},
      {t: 500, ts: 2},
      {t: 100, ts: 0},
    ],
  },
};
const ext = {
  style: "ext arch",
  bits: [
    {
      text: ">>>>PROGRESSION>>>>",
      style: "rbow",
      layers: 1,
      pos: [
        [0, 0, 0, 5, 0, 10, 4, 1, 1],
        [, , , 6, , , 1, 4, 1],
        [, , , 9, , 20, 1, 1, 4],
        [, , , 20, , 40, 6, 6, 6],
      ],
    },
  ],
  moves: {
    1: [{t: 500, ts: 1}],
    2: [{t: 500, ts: 2}],
    3: [{t: 100, ts: 0}],
    f: [{t: 5000, ts: 3}],
  },
};

const myMap = `\
 ┌───────────────┐   
 └@───┐          │ 
      └─┐        │ 
        └─┐ ╭────╯
          │ │
          
      ▐█▌┐└── ┌   │ 
    ▐█▌ │ 
 └──  ───┘ `;

const arena = `\
 ┌────────────────^#────(──╮   
 └─#──(──╮                 ╰─╮
         ╰─╮                 │    
          ┌┘        ▐▌     ╭@╯
          │▐██▌▐▌ ▐▌▐▌▐▌ ▐▌│
          ╰───────┐     ▐▌╭╯
                  ╰──#────╯`;

const map1 = `\
T┌───────^─╮ ╭───#───┐   
e│         ╰─╯       │   
e│                   │ 
x│   ╭──┐     ╭─┐    │ 
t└─┐ │  │     └─╯    │ 
i╭─┘ └#─╯ []         │ 
c╰───┐ ┌╮  ┌@─(──#───┘ 
onXXX└─┘╰─#┘ 
012345678901234567890            `;

const map2 = `\
     ╭───────#─────^───┐   
     │ ╭──────(─╮      │ 
     │ │  → →   ╰#───┐ │
     │ │        ┌────┘ │  
 ┌───╯ └#────(──╯      │ 
 ╰@┐ ↑ ┌───────────────┘
   └───╯
                      `;

const map3 = `\
     ╭───────#─────^───┐   
     │ ╭──────(─╮       │ 
     │ │ :XXX:  ╰#───┐  │
     │ │        ┌────┘  │  
 ┌───╯ └#────(──╯  ▐█▌  │ 
 ╰─┐   ┌──────────@────▐▌
   └───╯
                      `;

//HACK: DESIGN SPACE
const mapD = `\
D┌──────  ───┐   
e└──)─┐  └── ┌   │ 
s╭^──  ▐█▌┐└── ┌   │ 
    ▐█▌ │ 
 └──  ───┘ `;
