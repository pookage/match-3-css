import React, { useContext, useRef } from "react";
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
		selection,
		interactable
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
		if(selection.length > 0){
			dispatch({
				type: ACTIONS.POP_SELECTION,
				value: {
					cells: selection
				}
			});
			//slight delay before causing blocks to drop
			setTimeout(() => {
				dispatch({
					type: ACTIONS.APPLY_GRAVITY
				});
			}, 100);
		}
	}//popHighlightedCells

	return(
		<button
			className={`${s.wrapper} ${isEmpty ? s.popped : ""} ${isSelected ? s.highlighted : ""} ${drop ? s.dropped : ""}`}
			onMouseEnter={interactable ? selectMatchingNeighbours : null}
			onClick={interactable ? popHighlightedCells : null}
			style={dropTranslation}
			disabled={!interactable}>
			<span 
				className={s.animator}
				style={{ backgroundColor: color }} 
			/>
		</button>
	);
}//Cell