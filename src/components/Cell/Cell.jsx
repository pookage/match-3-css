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
		grid,
		highlightedCells
	} = state;

	const isHighlighted = highlightedCells.filter(targetCell.bind(true, { x, y })).length > 0;

	//EVENT HANDLING
	//----------------------
	function highlightMatchingNeighbours(){
		dispatch({
			type: ACTIONS.HIGHLIGHT_MATCHING_NEIGHBOURS,
			value: {
				x, y
			}
		});
	}//highlightMatchingNeighbours

	return(
		<div
			className={`${s.wrapper} ${isHighlighted ? s.highlighted : ""}`}
			onMouseEnter={highlightMatchingNeighbours}>
			<div 
				className={s.animator}
				style={{ backgroundColor: color }}>
				{x},{y}
			</div>
		</div>
	);
}//Cell