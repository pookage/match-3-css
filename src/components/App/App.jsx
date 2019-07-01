import React from "react";
import { Provider as AppProvider } from "./";
import Test from "COMPONENTS/Test/";
import "SHARED/reset.scss";

function App(){
	return(
		<AppProvider>
			<Test />
		</AppProvider>
	);
}//App

export default App;