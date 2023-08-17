
const P2 = (x, y) => ({x,y});
const EDGES = 6;
const RADIUS = 20;
const TAU = 2 * Math.PI;
const EDGE_LEN = Math.sin(Math.PI / EDGES) * RADIUS * 2;
const GRID_Y_SPACE = Math.cos(Math.PI / EDGES) * RADIUS * 2;
const GRID_X_SPACE = RADIUS * 2 - EDGE_LEN * 0.5;
const GRID_Y_OFFSET = GRID_Y_SPACE * 0.5;
const COLS = "=#3c2f18,#01335f,#3f0e77,#204a73,#511d94,#fe1f00,#0060fd,#fe7603,#f0ca1d,#b085e8,#e9cafa".split(",");
const rndItem = arr => arr[Math.random() * arr.length | 0];

/**
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} w 
 * @param {number} h 
 * @param {DOMPoint[]} points 
 * @param {CanvasRenderingContext2D} context 
 */
export function drawGrid(x, y, w, h, points, ctx) {
  const p = P2();
  var gy, gx;
  for (gy = y; gy < y + h; gy++) {
      for (gx = x; gx < x + w; gx++) {
          ctx.fillStyle = rndItem(COLS);
          drawPoly(gridToPixel(gx, gy, p), points, ctx);
      }
  }
}
function gridToPixel(gx, gy, p = {}) {
    p.x = gx * GRID_X_SPACE;
    p.y = gy * GRID_Y_SPACE + (gx % 2 ? GRID_Y_OFFSET : 0);       
    return p;
}

/**
 * 
 * @param {DOMPoint} p
 * @param {DOMPoint[]} points 
 * @param {CanvasRenderingContext2D} ctx 
 */
function drawPoly(p, points, ctx) { // p.x, p.y is center
    ctx.setTransform(1, 0, 0, 1, p.x, p.y);
    var i = 0;
    ctx.beginPath();
    while (i < points.length) {
        const p2 = points[i++];
        ctx.lineTo(p2.x, p2.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke()
}

/**
 * 
 * @param {number} sides 
 * @param {DOMPointReadOnly[]} [points]
 * @returns 
 */
export function createPoly(sides, points = []) {
    const step = TAU / sides;
    var ang = 0, i = sides;
    while (i--) {
        const point = DOMPointReadOnly.fromPoint({ x: RADIUS * Math.cos(ang), y: RADIUS * Math.sin(ang) });
        points.push(point);
        ang += step;
    }
    return points;
}