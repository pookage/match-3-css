import { ACTIONS } from "./";
import { random } from "SHARED/utils.js";

function reducer(state, action){

	const {
		grid
	} = state;

	const { 
		type,      // (string) one of the options from actions.js
		value = {} // (object) containing data associated with the action
	} = action;

	const { 
		x, y
	} = value;

	switch(type){
		case ACTIONS.HIGHLIGHT_MATCHING_NEIGHBOURS:
			const matchingNeighbours = findMatchingNeighbours({ x, y }, grid, [{ x, y }]);
			return {
				...state,
				highlightedCells: matchingNeighbours
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

function findMatchingNeighbours(cell, grid, matchingNeighbours){

	const { 
		color: targetColor,   // (string) hex reference to the colour we're looking to match
		neighbours            // (array){ x, y} coordinates to every cell adjacent to the current one
	} = grid[cell.y][cell.x]; // (object) data object of the current cell coordinates
	
	//go through every neighbour of the current cell
	for(let neighbour of neighbours){
		//grab the coords
		const { x, y }  = neighbour; 
		//retrieve the data-object with the coords
		const { color } = grid[y][x];

		//if the colour matches, then add the neighbour to the finished list
		if(color == targetColor){
			//if we don't already have the current cell stored...
			if(!matchingNeighbours.find(currentCell.bind(true, neighbour))){
				//add the current neighbour...
				matchingNeighbours = [ neighbour, ...matchingNeighbours ];
				//..and investigate all of that neighbour's neighbours
				matchingNeighbours = findMatchingNeighbours(neighbour, grid, matchingNeighbours);
			}
		}
	}

	return matchingNeighbours;
}//findMatchingNeighbours

function currentCell(targetCell, cell){

	const xMatch = cell.x == targetCell.x;
	const yMatch = cell.y == targetCell.y;

	return xMatch && yMatch;
}//currentCell

export {
	reducer,
	generateGrid
};