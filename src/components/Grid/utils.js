import { ACTIONS } from "./";
import { random, cloneGrid } from "SHARED/utils.js";
import { byCoords } from "./filters.js";


function reducer(state, action){

	const {
		grid, 
		updates
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
			const emptiedGrid = applyEmptyCells(grid, cells);
			return {
				...state,
				grid: emptiedGrid,
				selection: []
			}

		case ACTIONS.APPLY_GRAVITY:
			const [ gravityGrid, newUpdates ] = applyGravity(grid);
			return {
				...state,
				updates: newUpdates,
				grid: gravityGrid
			};

		case ACTIONS.APPLY_UPDATES:
			const updatedGrid = applyUpdates(grid, updates);
			return {
				...state,
				grid: updatedGrid
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
			
			const color = colors[random(0, colors.length-1)];

			columns[column] = {
				x: column, 
				y: row,
				color,
				isEmpty: false,
				drop: 0,
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

function applyEmptyCells(grid, cells){

	//create a clone of the grid
	const newGrid = cloneGrid(grid);

	//mark the selected cells as empty
	for(let cell of cells){
		const { x, y } = cell;
		newGrid[y][x].isEmpty = true;
	}

	return newGrid;
}//applyEmptyCells

function applyGravity(grid){

	const newGrid = cloneGrid(grid);
	const rows    = newGrid.length;
	const columns = newGrid[0].length;
	const chains  = []; //storage for every cell-chain that needs to update later

	//go along each column
	for(let x = 0; x < columns; x++){

		let y            = rows-1; //start at the bottom
		let dropDistance = 0;      // the amount of cells needed to dropBy

		//template for the chain update
		let chain = {
			column: x,
			start: undefined,
			cells: []
		};

		//keep going up the rows
		while(y > -1){
			const cell = newGrid[y][x];

			//if the cell is empty, make the amount the next block drops larger
			if(cell.isEmpty) {
				//if this is the first empty cell, start a new chain here
				if(!dropDistance) chain.start = y;
				//another empty cell means further to drop
				dropDistance++;
			} else if(dropDistance > 0){
				//as long as there's distance to drop, let the cell know
				cell.drop = dropDistance;
				//add this non-empty cell to the update chain
				chain.cells.push(cell);
			}

			//go up one row
			y--;
		}

		//if there's been any state changes in this column, store to update late
		if(chain.cells.length > 0) chains.push(chain);
	}

	return [ newGrid, chains ];
}//applyGravity

function applyUpdates(grid, updates){

	const newGrid = cloneGrid(grid);

	for(let chain of updates){

		const { 
			column, 
			start, 
			cells 
		} = chain;

		let y = start;
		while(y > -1){

			//target the cell to apply updates to
			const cell   = newGrid[y][column];

			// grab the colour from the update chain;
			// default to empty when nothing left
			const {
				color   = "transparent",
				isEmpty = true
			} = cells.shift() || {};

			//apply updates
			cell.color   = color;   // apply colour
			cell.drop    = 0;       // remove all drop animations
			cell.isEmpty = isEmpty; // remove empty flags while there's colour

			//go up in the column
			y--;
		}
	}

	return newGrid;
}//applyUpdates


export {
	reducer,
	generateGrid
};