import { ACTIONS } from "./";

function reducer(state, action){

	const { type, value } = action;

	switch(type){
		case ACTIONS.TEST_ACTION:
			return {
				...state,
				debug: "fired test action"
			};
			
		default:
			return {
				...state
			};
	}

}//reducer

export {
	reducer
};