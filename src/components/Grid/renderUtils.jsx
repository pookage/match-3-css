import React from "react";
import Cell from "COMPONENTS/Cell/";

function renderCell(data, index){

	const {
		x, y,
		color,
		neighbours,
		isEmpty,
		drop,
	} = data;

	return(
		<Cell 
			x={x}
			y={y}
			color={color}
			isEmpty={isEmpty}
			neighbours={neighbours}
			drop={drop}
			key={`cell__${x}_${y}`}
		/>
	);

}//renderCell

export {
	renderCell
};
