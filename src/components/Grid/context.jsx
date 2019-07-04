import React, { createContext, useReducer } from "react";
import { reducer, generateGrid } from "./utils.js";
import { ACTIONS } from "./";

const Grid         = createContext();
const width        = 10;
const height       = 15;
const colors      = ["#2442d6", "#7fdb42", "#bc2bd6", "#f5ef42", "#c72020", "#10e3df"];
const grid         = generateGrid(width, height, colors);
const initialState = {
	width, height,
	grid,
	updates: [],
	selection: []
};

function Provider(props){

	//HOOKS
	//-----------------
	const [ state, dispatch ] = useReducer(reducer, initialState);

	//RENDER VARS
	//-----------------
	const { children } = props;

	return(
		<Grid.Provider 
			value={{ state, dispatch }}>
			{children}
		</Grid.Provider>
	);
}//AppProvider

export {
	Grid,
	Provider
};