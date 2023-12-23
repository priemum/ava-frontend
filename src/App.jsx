import Router from "./routes/index";
import ReactGA from "react-ga";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
ReactGA.initialize("G-TKD3LN2FB4");
const App = () => {
	const location = useLocation();
	useEffect(() => {
		ReactGA.pageview(location.pathname + location.search);
	}, [location]);
	return <Router />;
};
export default App;
