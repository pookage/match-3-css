import { ACTIONS } from "./";

function reducer(state, action){

	const { 
		type, 
		value = {} 
	} = action;

	switch(type){
		case ACTIONS.UPDATE_SCORE:
			const { score, lastPop } = value;
			const message = generateMessage(lastPop);
			return {
				...state,
				score,
				lastPop,
				message
			};

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

function generateMessage(lastPop){

	if(lastPop > 30)       return "Holy ballbags batman!";
	else if (lastPop > 20) return "Mad skillzzzz";
	else if (lastPop > 10) return "Niiiice";
	else                   return "";

}//lastPop

export {
	reducer
};