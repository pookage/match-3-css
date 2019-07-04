import { ACTIONS } from "./";

const LOCAL_STORAGE_KEY = "POOK__GAME__MATCH3_SCORE";

function reducer(state, action){

	const { 
		type, 
		value = {} 
	} = action;

	switch(type){
		case ACTIONS.UPDATE_SCORE:
			let { 
				score, 
				lastPop, 
				remainingTiles,
				bestScore = state.bestScore
			} = value;
			const message      = generateMessage(lastPop, remainingTiles);
			const gameOver     = remainingTiles == 0;
			const newHighScore = score > bestScore;

			if(newHighScore){
				bestScore = score;
				savePersonalBest(score);
			}
			return {
				...state,
				score,
				lastPop,
				message,
				gameOver,
				bestScore
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

}//generateMessage

function loadPersonalBest(){
	if(window.localStorage && window.localStorage.getItem){
		const scoreString = localStorage.getItem(LOCAL_STORAGE_KEY);
		if(scoreString) return parseInt(scoreString);
		else            return 0;
	} else              return 0;
}//loadPersonalBest

function savePersonalBest(score){
	if(window.localStorage && window.localStorage.setItem){
		localStorage.setItem(LOCAL_STORAGE_KEY, score.toString());
	}
}//savePersonalBest

export {
	reducer,
	loadPersonalBest,
	savePersonalBest
};