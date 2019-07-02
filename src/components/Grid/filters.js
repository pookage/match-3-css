function byCoords(targetCell, cell){

	const xMatch = cell.x == targetCell.x;
	const yMatch = cell.y == targetCell.y;

	return xMatch && yMatch;
}//byCoords

export {
	byCoords
};
