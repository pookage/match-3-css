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
		score,   // (number) total cummulative score so far
		lastPop, // (number) the score you got in your last pop
		message  // (string) a message that flashes up on high pops
	} = state;

	function toggleMessageAnimation(){
		const maxAnimations = 2;
		const nextAnimation = animation + 1 == maxAnimations ? 0 : animation + 1;
		setAnimation(nextAnimation);
	}//toggleMessageAnimation

	return(
		<header
			className={s.wrapper}>
			<section className={s.score}>
				<h1 className={s.title}>
					Score
				</h1>
				<dl className={s.scorables}>
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
				className={`${s.message} ${s[`animation__${animation}`]}`}>
				{message}
			</aside>
		</header>
	);
}//UI