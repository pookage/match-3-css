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
		selection
	} = state;

	const isSelected = selection.filter(targetCell.bind(true, { x, y })).length > 0;

	//EVENT HANDLING
	//----------------------
	function selectMatchingNeighbours(){
		dispatch({
			type: ACTIONS.SELECT_MATCHING_NEIGHBOURS,
			value: {
				cell: { x, y }
			}
		});
	}//selectMatchingNeighbours
	function popHighlightedCells(){
		dispatch({
			type: ACTIONS.POP_SELECTION,
			value: {
				cells: selection
			}
		});
	}//popHighlightedCells

	return(
		<div
			className={`${s.wrapper} ${isSelected ? s.highlighted : ""}`}
			onMouseEnter={selectMatchingNeighbours}
			onClick={popHighlightedCells}>
			<div 
				className={s.animator}
				style={{ backgroundColor: color }}>
				{x},{y}
			</div>
		</div>
	);
}//Cell