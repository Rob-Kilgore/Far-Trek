import React, {useState} from 'react';
import ReactMapGL from "react-map-gl";
import URL from 'url';
import './App.css';
import {getPath} from './navigation/Navigate';

function App() {
	const [viewport, setViewport] = useState({
		latitude: 42.391484,
		longitude: -72.529089,
		zoom: 10,
		width: "100vw",
		height: "100vh",		
	});
	
	// Parse URL
	const queryParams = URL.parse(window.location.href, true).query;
	const startPosition = queryParams.startPosition;
	const endPosition = queryParams.endPosition;
	const weight = queryParams.weight;
	
	var path = [];
	if(startPosition && endPosition && weight){
		path = getPath(startPosition, endPosition, weight/100.0);
		console.log(path);
	}
	
	
	
	return (
		<div>			
			<ReactMapGL {...viewport}
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
				mapStyle="mapbox://styles/fartrekker/ck3ut11zx2cgj1cs4uz06ahu2"
				onViewportChange={viewport => {
					setViewport(viewport);
				}}
			/>
			<div style={{position: "absolute", top: "0px", left: "0px"}}>
			<form>				
				Start Position: <input type="text" name="startPosition" value={startPosition}/>
				<br />
				End Position: <input type="text" name="endPosition" value={endPosition}/>
				<br />
				Weight: <input type="range" name="weight" min="0" max="100" step="1" value={weight}/>
				<br />
				<input type="submit" value="Calculate Path" />
			</form>
			
			</div>
		</div>
	);
}

export default App;
