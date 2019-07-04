import React from "react";
import { Provider as AppProvider } from "./";
import Grid, { Provider as GridProvider } from "COMPONENTS/Grid/";
import UI from "COMPONENTS/UI/"
import "SHARED/reset.scss";
import "SHARED/global.scss";
import "SHARED/animations.scss";

function App(){
	return(
		<AppProvider>
			<GridProvider>
				<Grid />
			</GridProvider>
			<UI />
		</AppProvider>
	);
}//App

export default App;