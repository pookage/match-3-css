import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
	App as AppContext, 
	ACTIONS as APP_ACTIONS 
} from "COMPONENTS/App/";
import { ACTIONS } from "./";
import { reducer, generateGrid } from "./utils.js";

const Grid         = createContext();
const width        = 10;
const height       = 10;
const colors       = ["#2442d6", "#7fdb42", "#bc2bd6", "#ffb326", "#c72020", "#10e3df"];
const grid         = generateGrid(width, height, colors);
const initialState = {
	width, height,
	grid,
	updates: [],
	selection: [],
	interactable: true,
	score: 0,
	lastPop: 0,
	remainingTiles: width * height
};

function Provider(props){

	//HOOKS
	//-----------------
	const [ state, dispatch ]       = useReducer(reducer, initialState);
	const { dispatch: appDispatch } = useContext(AppContext);
	useEffect(publishScore, [ state.score, state.lastPop ]);


	//RENDER VARS
	//-----------------
	const { children } = props;
	const { 
		score, 
		lastPop, 
		remainingTiles 
	} = state;


	//EFFECT HANDLING
	//-----------------
	function publishScore(){
		appDispatch({
			type: APP_ACTIONS.UPDATE_SCORE,
			value: {
				score,
				lastPop,
				remainingTiles
			}
		});
	}//publishScore


	return(
		<Grid.Provider 
			value={{ state, dispatch }}>
			{children}
		</Grid.Provider>
	);
}//Provider

export {
	Grid,
	Provider
};