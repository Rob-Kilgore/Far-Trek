import React, {useState} from 'react';
import ReactMapGL from "react-map-gl";
import './App.css';
import {getPath} from './navigation/Navigate';
import DeckGL from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';
import {PathLayer} from '@deck.gl/layers';

function App() {	
	const [viewport, setViewport] = useState({
		latitude: 42.391484,
		longitude: -72.529089,
		zoom: 10,
		width: "100vw",
		height: "100vh",		
	});
	var [path, setPath] = useState([]);
	
	var startPosition = "";
	var endPosition = "";
	var weight = 0;
		
	var pathLayer = new PathLayer({
		id: 'path-layer',
		data: [{path: path}],
		pickable: true,
		widthScale: 20,
		widthMinPixels: 2,
		getPath: d => d.path,
		getColor: d => [255, 140, 0],
		getWidth: d => 1,
		rounded: true,		
	});
	
	var updatePathLayer = function(){
		if(startPosition && endPosition){
			var coordinatePath = [];
			var nodePath = getPath(startPosition, endPosition, weight);
			nodePath.forEach(node => {
				coordinatePath.push([node.lon, node.lat])
			});
			setPath(coordinatePath);
		}		
	}	
		
	return (
		<div>			
			
			<DeckGL
				initialViewState={viewport}
				height="100%"
				width="100%"
				controller={true} // allows the user to move the map around
				layers={[pathLayer]}
				//onClick={(event) => {
				//	const pickInfo = deck.pickObject({x: event.clientX, y: event.clientY});
				//	console.log(pickInfo.coordinate);
				//}}
			>
				<StaticMap
					mapStyle="mapbox://styles/fartrekker/ck3ut11zx2cgj1cs4uz06ahu2"
					mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
				/>
			</DeckGL>
			
			<div style={{position: "absolute", top: "0px", left: "0px"}}>
			<form>				
				Start Position:
				<input type="text" name="startPosition"
					onChange={(event) => {startPosition = event.target.value}}
				/>
				<br />
				End Position:
				<input type="text" name="endPosition"
					onChange={(event) => {endPosition = event.target.value}}
				/>
				<br />
				Weight:
				<input type="range" name="weight"
					min="0" max="100" step="1"
					onChange={(event) => {weight = event.target.value/100.0}}
				/>
				<br />
				<input type="button" value="Calculate Path"
					onClick={updatePathLayer}
				/>
			</form>
			
			</div>
		</div>
	);
}

export default App;
