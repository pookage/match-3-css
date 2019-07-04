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
		neighbours,
		isEmpty,
		drop,
	} = props;

	const {
		grid,
		selection
	} = state;

	const isSelected      = selection.filter(targetCell.bind(true, { x, y })).length > 0;
	const dropTranslation = { transform: `translateY(${drop * 100}%)` };

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
			className={`${s.wrapper} ${isEmpty ? s.popped : ""} ${isSelected ? s.highlighted : ""} ${drop ? s.dropped : ""}`}
			onMouseEnter={selectMatchingNeighbours}
			onClick={popHighlightedCells}
			style={dropTranslation}>
			<div 
				className={s.animator}
				style={{ backgroundColor: color }}>
				{y},{x}
			</div>
		</div>
	);
}//Cell