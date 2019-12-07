import React, {useState} from 'react';
import ReactMapGL from "react-map-gl";
import './App.css';

function App() {
	const [viewport, setViewport] = useState({
		latitude: 42.391484,
		longitude: -72.529089,
		zoom: 10,
		width: "100vw",
		height: "100vh",		
	});
	
	return (
		<div>			
			<ReactMapGL {...viewport}
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
				mapStyle="mapbox://styles/fartrekker/ck3ut11zx2cgj1cs4uz06ahu2"
				onViewportChange={viewport => {
					setViewport(viewport);
				}}
			>		
			</ReactMapGL>
			<div style={{position: "absolute", top: "0px", left: "0px"}}>
				<input type="button"></input>
			</div>
		</div>
	);
}

export default App;
