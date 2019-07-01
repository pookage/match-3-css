import React, { useContext } from "react";
import { 
	App as AppContext, 
	ACTIONS 
} from "COMPONENTS/App/";

export default function Test(){

	//HOOKS
	//-------------------
	const { state, dispatch } = useContext(AppContext);

	//RENDER VARS
	//-------------------
	const { debug } = state;


	//EVENT HANDLING
	//-------------------
	function fireTest(){
		dispatch({
			type: ACTIONS.TEST_ACTION
		});

	}//fireTest

	return(
		<p onClick={fireTest}>
			{debug}
		</p>
	);
}//Test