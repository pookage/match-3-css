function random(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}//random

function cloneGrid(original){
	const clone = new Array(original.length);
	for(let column = 0; column < clone.length; column++){
		const rows = new Array(original[0].length);
		clone[column] = rows;
		for(let row = 0; row < rows.length; row++){	
			clone[column][row] = { ...original[column][row] }
		}
	}

	return clone;
}//cloneGrid

export {
	random,
	cloneGrid
};