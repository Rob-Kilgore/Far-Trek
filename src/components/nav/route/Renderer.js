import React, {useState} from 'react';
import ReactMapGL from "react-map-gl";
import './Renderer.css';
import {getPath} from '../../../navigation/Navigate';
import DeckGL from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';
import {PathLayer} from '@deck.gl/layers';
import { render } from '@testing-library/react';
import switch_icon from './switch_icon.svg';

function Renderer() {
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
			setPath(getPath(startPosition, endPosition, weight));
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
			>
				<StaticMap
					mapStyle="mapbox://styles/fartrekker/ck3ut11zx2cgj1cs4uz06ahu2"
					mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
				/>
			</DeckGL>
			<NavInput />
		</div>
	);
}


class NavInput extends React.Component {
	render() {
		return(
			<div className="NavInput">
				<div id="input-box">
					<form>
						<input class="nav-input-field" type="text" name="startPosition"  placeholder="start" onChange={(event) => {this.startPosition = event.target.value}} />
						<input class="nav-input-field" type="text" name="endPosition"  placeholder="destination" onChange={(event) => {this.endPosition = event.target.value}} />
						<div id="weight-wrapper">
							<span class="weight-labels">easier</span>
							<input class="slider" type="range" name="weight" min="0" max="100" step="1" onChange={(event) => {this.weight = event.target.value/100.0}} />
							<span class="weight-labels">harder</span>
						</div>
						<input id="navigate-btn" type="button" value="navigate" onClick={this.updatePathLayer} />
					</form>
				</div>
			</div>
		);
	}
}

export default Renderer;
