import React, { useContext, useEffect, useState } from "react";
import { App as AppContext } from "COMPONENTS/App/";
import s from "./styles.scss";

export default function UI(){

	//HOOKS
	//------------------
	const { state }                   = useContext(AppContext);
	const [ animation, setAnimation ] = useState(0)
	useEffect(toggleMessageAnimation, [ state.message ]);

	//RENDER VARS
	//------------------
	const {
		bestScore, // (number) historical high score
		score,     // (number) total cummulative score so far
		lastPop,   // (number) the score you got in your last pop
		message,   // (string) a message that flashes up on high pops
		gameOver   // (boolean) whether or not the game is finished
	} = state;

	//EFFECT HANDLING
	//------------------
	function toggleMessageAnimation(){
		const maxAnimations = 2;
		const nextAnimation = animation + 1 == maxAnimations ? 0 : animation + 1;
		setAnimation(nextAnimation);
	}//toggleMessageAnimation


	//EVENT HANDLING
	//------------------
	function replay(){
		window.location.reload();
	}//replay

	return(
		<header
			className={`${s.wrapper} ${gameOver ? s.interactable : s.uninteractable}`}>
			<section className={s.score}>
				<h1 className={s.title}>
					Score
				</h1>
				<dl className={s.scorables}>
					<div className={s.attribute}>
						<dt className={s.key}>
							Personal Best
						</dt>
						<dd className={s.value}>
							{bestScore}
						</dd>
					</div>
					<div className={s.attribute}>
						<dt className={s.key}>
							Current Score
						</dt>
						<dd className={s.value}>
							{score}
						</dd>
					</div>
					<div className={s.attribute}>
						<dt className={s.key}>
							Last Pop
						</dt>
						<dd className={s.value}>
							{lastPop}
						</dd>
					</div>
				</dl>
			</section>
			<aside 
				className={`${s.message} ${!gameOver ? s[`animation__${animation}`] : s.gameOver}`}>
				<h1 className={s.title}>
					{message}
				</h1>
				{gameOver && [
					<p  className={s.body}
						key="ui__final_score">
						Final score: {score}
					</p>,
					<button  
						className={`${s.body} ${s.replay}`}
						onClick={replay}
						key="ui__play_again">
						Play again?
					</button>
				]}
			</aside>
		</header>
	);
}//UI