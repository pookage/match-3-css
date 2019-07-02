import { ACTIONS } from "./";
import { random } from "SHARED/utils.js";

function reducer(state, action){

	const { 
		type,      // (string) one of the options from actions.js
		value = {} // (object) containing data associated with the action
	} = action;

	const { 
		x, y,
		neighbours 
	} = value;

	switch(type){
		case ACTIONS.HIGHLIGHT_CELL:
			return {
				...state,
				highlightedCells: [{
					x, y
				}]
			}
		case ACTIONS.HIGHLIGHT_NEIGHBOURS:
			return {
				...state,
				highlightedCells: neighbours
			}
		default:
			return {
				...state
			};
	}
}//reducer

function generateGrid(width, height, colors){

	//create the the columns to describe x
	const columns = new Array(width);
	for(let column = 0; column < width; column++){
		//for every column, add in all the rows
		const rows = new Array(height);

		//populate every cell in the row with a clear data object
		for(let row = 0; row < height; row++){
			
			const color = colors[random(0, 2)];

			rows[row] = {
				x: row, 
				y: column,
				color,
				neighbours: calculateNeighbours(row, column, width, height)
			};

		}

		//add all of the rows to the current column
		columns[column] = rows;
	}

	//spit out the columns, which contain rows, which contain cell-data
	return columns;
}//generateGrid

function calculateNeighbours(x, y, width, height){

	const neighbours = [];

	//figure out the position of the cell in the grid
	const atTop    = y == 0;
	const atRight  = x == width - 1;
	const atBottom = y == height - 1;
	const atLeft   = x == 0;

	//based on the cell's position, selectively add neighbour coords
	if(!atTop)    neighbours.push({ x, y: y-1 });
	if(!atRight)  neighbours.push({ x: x+1, y });
	if(!atBottom) neighbours.push({ x, y: y+1 });
	if(!atLeft)   neighbours.push({ x: x-1, y });

	return neighbours;
}//calculateNeighbours

export {
	reducer,
	generateGrid
};