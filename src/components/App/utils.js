import { ACTIONS } from "./";

function reducer(state, action){

	const { 
		type, 
		value = {} 
	} = action;

	switch(type){
		case ACTIONS.UPDATE_SCORE:
			const { score, lastPop, remainingTiles } = value;
			const message = generateMessage(lastPop, remainingTiles);
			const gameOver = remainingTiles == 0;
			return {
				...state,
				score,
				lastPop,
				message,
				gameOver
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

function generateMessage(lastPop, remainingTiles){

	if(remainingTiles == 10)      return "Almost done!";
	else if (remainingTiles == 1) return "Sad, lonely tile!";
	else if (remainingTiles == 0) return "Game Over!";
	else if(lastPop > 30)         return "Holy ballbags batman!";
	else if (lastPop > 20)        return "Mad skillzzzz";
	else if (lastPop > 10)        return "Niiiice";
	else                          return "";

}//lastPop

export {
	reducer
};