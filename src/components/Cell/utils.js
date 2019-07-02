function targetCell(target, current){

	const {
		x, y
	} = current;
	const {
		x: targetX,
		y: targetY
	} = target;

	const found = x == targetX && y == targetY;

	return found;
}//targetCell

export {
	targetCell
};