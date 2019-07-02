import React, { createContext, useReducer } from "react";
import { reducer, generateGrid, gener } from "./utils.js";

const Grid         = createContext();
const width        = 10;
const height       = 10;
const colors      = ["#4287f5", "#7fdb42", "#c22f60"];
const grid         = generateGrid(width, height, colors);
const initialState = {
	width, height,
	grid,
	selection: [{ x: null, y: null }]
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