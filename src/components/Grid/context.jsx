import React, { createContext, useReducer, useEffect } from "react";
import { reducer, generateGrid, gener } from "./utils.js";
import { ACTIONS } from "./";

const Grid         = createContext();
const width        = 5;
const height       = 10;
const colors      = ["#4287f5", "#7fdb42", "#c22f60"];
const grid         = generateGrid(width, height, colors);
const initialState = {
	width, height,
	grid,
	selection: [{ x: null, y: null }],
	tick: 0,
	tickInterval: 1000
};

function Provider(props){

	//HOOKS
	//-----------------
	const [ state, dispatch ] = useReducer(reducer, initialState);
	useEffect(beginTick, [])

	//EFFECT HANDLING
	function beginTick(){
		const tick = setInterval(() => {
			dispatch({
				type: ACTIONS.TICK
			});
		}, state.tickInterval);

		return () => { clearInterval(tick) };
	}//beginTick

	//RENDER VARS
	//-----------------
	const { children } = props;

	return(
		<Grid.Provider value={{ state, dispatch }}>
			{children}
		</Grid.Provider>
	);
}//AppProvider

export {
	Grid,
	Provider
};