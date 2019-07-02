import { ACTIONS } from "./";
import { random, cloneGrid } from "SHARED/utils.js";
import { byCoords } from "./filters.js";


function reducer(state, action){

	const {
		grid, tick
	} = state;

	const { 
		type,      // (string) one of the options from actions.js
		value = {} // (object) containing data associated with the action
	} = action;

	const {
		cell, // (object){x, y} containg coords to the cells grid-reference
		cells // (array) containing multiple cell coords
	} = value;

	switch(type){
		case ACTIONS.SELECT_MATCHING_NEIGHBOURS:
			const matchingNeighbours = findMatchingNeighbours(cell, grid, [ cell ]);
			return {
				...state,
				selection: matchingNeighbours
			}
		case ACTIONS.POP_SELECTION:
			const emptiedGrid = emptyCells(grid, cells);
			return {
				...state,
				grid: emptiedGrid
			}

		case ACTIONS.TICK:
			const gravityGrid = applyGravity(grid);
			return {
				...state,
				grid: gravityGrid,
				tick: tick + 1
			};
		default:
			return {
				...state
			};
	}
}//reducer

function generateGrid(width, height, colors){

	//create the the rows to describe x
	const rows = new Array(height);
	for(let row = 0; row < height; row++){
		//for every row, add in all the rows
		const columns = new Array(width);
		//populate every cell in the column with a clear data object
		for(let column = 0; column < width; column++){
			const color = colors[random(0, 2)];

			columns[column] = {
				x: column, 
				y: row,
				color,
				isEmpty: false,
				shouldDrop: false,
				neighbours: calculateNeighbours(column, row, width, height)
			};

		}

		//add all of the columns to the current row
		rows[row] = columns;
	}

	//spit out the rows, which contain columns, which contain cell-data
	return rows;
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
			if(!matchingNeighbours.find(byCoords.bind(true, neighbour))){
				//add the current neighbour...
				matchingNeighbours = [ neighbour, ...matchingNeighbours ];
				//..and investigate all of that neighbour's neighbours
				matchingNeighbours = findMatchingNeighbours(neighbour, grid, matchingNeighbours);
			}
		}
	}

	return matchingNeighbours;
}//findMatchingNeighbours

function emptyCells(grid, cells){

	//create a clone of the grid
	const newGrid = cloneGrid(grid);

	//mark the selected cells as empty
	for(let cell of cells){
		const { x, y } = cell;
		newGrid[y][x].isEmpty = true;
	}

	return newGrid;
}//emptyCells

function applyGravity(grid){

	console.log("tick!")
	const newGrid = cloneGrid(grid);

	const rows    = newGrid.length;
	const columns = newGrid[0].length;

	for(let y = newGrid.length-1; y > 0; y--){
		for(let x = newGrid[y].length-1; x > -1; x--){
			const cell      = newGrid[y][x];
			
			if(cell.isEmpty){
				const cellAbove      = newGrid[y-1][x];
				cellAbove.shouldDrop = true;	
			}
		}
	}

	return newGrid;
}//applyGravity


export {
	reducer,
	generateGrid
};