import { drawGrid, createPoly } from "../src/utils/hexagon-grid.render.js";

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector(".game")

const context = canvas.getContext("2d")

context.canvas.width  = window.innerWidth;
context.canvas.height = window.innerHeight;

drawGrid(1,1,14,15, createPoly(6), context)