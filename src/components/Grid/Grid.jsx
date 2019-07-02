import React, { useContext } from "react";
import { Grid as GridContext } from "./";
import { renderCell } from "./renderUtils.jsx";
import s from "./styles.scss";

function Grid(){

	//HOOKS
	//------------------
	const { state, dispatch } = useContext(GridContext);

	//RENDER VARS
	//------------------
	const { grid, width, height } = state;
	const cells = grid.flat();
	const layout = {
		gridTemplateRows: `repeat(${width}, 1fr)`,
		gridTemplateColumns: `repeat(${height}, 1fr)`
	};

	return(
		<div 
			className={s.wrapper}
			style={ layout }>
			{ cells.map(renderCell) }
		</div>
	);
}//Grid

export default Grid;