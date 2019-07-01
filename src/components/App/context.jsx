import React, { createContext, useReducer } from "react";
import { reducer } from "./utils.js";

const App          = createContext();
const initialState = {
	debug: "This is the initial state"
};

function Provider(props){

	//HOOKS
	//-----------------
	const [ state, dispatch ] = useReducer(reducer, initialState);

	//RENDER VARS
	//-----------------
	const { children } = props;

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