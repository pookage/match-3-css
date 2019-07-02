import React, { useContext } from "react";
import { 
	ACTIONS, 
	Grid as GridContext 
} from "COMPONENTS/Grid/";
import { targetCell } from "./utils.js";
import s from "./styles.scss";

export default function Cell(props){

	//HOOKS
	//----------------------
	const { state, dispatch } = useContext(GridContext);


	//RENDER VARS
	//----------------------
	const {
		x, y,
		color,
		neighbours
	} = props;

	const {
		highlightedCells
	} = state;

	const isHighlighted = highlightedCells.filter(targetCell.bind(true, { x, y })).length > 0;

	//EVENT HANDLING
	//----------------------
	function highlightCell(){
		dispatch({
			type: ACTIONS.HIGHLIGHT_CELL,
			value: { x, y }
		});
	}//highlightCell
	function highlightNeighbours(){
		// console.log(neighbours)
		dispatch({
			type: ACTIONS.HIGHLIGHT_NEIGHBOURS,
			value: {
				neighbours
			}
		});
	}//highlightNeibours

	return(
		<div
			className={`${s.wrapper} ${isHighlighted ? s.highlighted : ""}`}
			onMouseEnter={highlightNeighbours}>
			{x},{y}
		</div>
	);
}//Cell