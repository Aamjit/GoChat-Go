import "./App.css";
import ChatScreen from "./components/ChatScreen";
import Hero from "./components/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Hero />} />
					<Route path="/chat" element={<ChatScreen />} />
				</Routes>
			</BrowserRouter>
			{/*  Create route component to ChatScreen */}
		</>
	);
}

export default App;
