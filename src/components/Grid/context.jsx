import React, { createContext, useReducer } from "react";
import { reducer, generateGrid } from "./utils.js";

const Grid         = createContext();
const width        = 10;
const height       = 10;
const initialState = {
	width, height,
	grid: generateGrid(width, height),
	highlightedCells: [{ x: null, y: null }]
};

function Provider(props){

	//HOOKS
	//-----------------
	const [ state, dispatch ] = useReducer(reducer, initialState);

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