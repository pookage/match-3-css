import React, { useContext } from "react";
import {
	ACTIONS, 
	Grid as GridContext 
} from "./";
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
		gridTemplateRows: `repeat(${height}, 1fr)`,
		gridTemplateColumns: `repeat(${width}, 1fr)`
	};

	//EVENT HANDLING
	//-----------------
	function debounceAnimationCallbacks(event){

		const {
			animationName
		} = event;

		switch(animationName.toLowerCase()){
			case "cell__bounce":
				//signal that all bouncing has finished once the last has fired
				clearTimeout(window.cellBounceTimeout);
				window.cellBounceTimeout = setTimeout(signalBounceEnd, 50);
				break;
		}
		event.persist();
	}//debounceAnimationCallbacks
	function signalBounceEnd(){
		dispatch({
			type: ACTIONS.APPLY_UPDATES
		});
	}//signalBounceEnd

	return(
		<div 
			className={s.wrapper}
			style={ layout }
			onAnimationEnd={debounceAnimationCallbacks}>
			{ cells.map(renderCell) }
		</div>
	);
}//Grid

export default Grid;