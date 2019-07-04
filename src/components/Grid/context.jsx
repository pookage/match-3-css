import React, { createContext, useReducer, useEffect } from "react";
import { reducer, generateGrid, gener } from "./utils.js";
import { ACTIONS } from "./";

const Grid         = createContext();
const width        = 10;
const height       = 15;
const colors      = ["#2442d6", "#7fdb42", "#bc2bd6", "#f5ef42", "#c72020", "#10e3df"];
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
	// useEffect(beginTick, [])

	//EFFECT HANDLING
	function beginTick(){
		const tickInterval = setInterval(tick, state.tickInterval);
		return () => { clearInterval(tickInterval) };
	}//beginTick
	function tick(){
		dispatch({
			type: ACTIONS.TICK
		});
	}//tick

	//RENDER VARS
	//-----------------
	const { children } = props;

	window.tick = tick;

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