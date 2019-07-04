import React, { createContext, useReducer } from "react";
import { reducer, loadPersonalBest, savePersonalBest } from "./utils.js";

const App          = createContext();
const initialState = {
	score: 0,
	lastPop: 0,
	bestScore: loadPersonalBest(),
	message: "",
	gameOver: false,
	debug: "This is the initial state"
};

function Provider(props){

	//HOOKS
	//-----------------
	const [ state, dispatch ] = useReducer(reducer, initialState);

	//RENDER VARS
	//-----------------
	const { children } = props;
	const { bestScore } = state;

	return(
		<App.Provider value={{ state, dispatch }}>
			{children}
		</App.Provider>
	);
}//AppProvider

export {
	App,
	Provider
};