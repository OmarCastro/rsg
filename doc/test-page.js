import { drawGrid, createPoly } from "../src/utils/hexagon-grid.render.js";

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector(".game")



/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
const redraw = (canvas) => {
    const context = canvas.getContext("2d")
    drawGrid(1,1,14,15, createPoly(6), context)
}


/**
 * 
 * @param {HTMLCanvasElement} canvas 
 */
const updateCanvasSize = (canvas, rect) => {
    canvas.width  = rect.width;
    canvas.height = rect.height;

    redraw(canvas)
}

const context = canvas.getContext("2d")

updateCanvasSize(canvas, canvas.getBoundingClientRect())

const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        updateCanvasSize(entry.target, entry.contentRect)        
    }
});

resizeObserver.observe(canvas)