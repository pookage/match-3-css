import React from "react";
import { Provider as AppProvider } from "./";
import Grid, { Provider as GridProvider } from "COMPONENTS/Grid/";
import "SHARED/reset.scss";
import "SHARED/global.scss";

function App(){
	return(
		<AppProvider>
			<GridProvider>
				<Grid />
			</GridProvider>
		</AppProvider>
	);
}//App

export default App;