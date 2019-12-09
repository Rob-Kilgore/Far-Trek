import React, {useState} from 'react';
import ReactMapGL from "react-map-gl";
import './Renderer.css';
import {getPath} from '../../../navigation/Navigate';
import DeckGL from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';
import {PathLayer} from '@deck.gl/layers';
import { render } from '@testing-library/react';
import switch_icon from './switch_icon.svg';

const viewport = useState({
	latitude: 42.391484,
	longitude: -72.529089,
	zoom: 10,
	width: "100vw",
	height: "100vh",		
});

class Renderer extends React.Component {
	constructor(props) {
		super(props);

		let path = useState([]);
		let setPath = useState([]);
	
		let startPosition = "";
		let endPosition = "";
		let weight = 0;
	}

	updatePathLayer(){
		if(this.startPosition && this.endPosition){
			this.setPath(getPath(this.startPosition, this.endPosition, this.weight));
		}		
	}

	render() {

		const pathLayer = new PathLayer({
			id: 'path-layer',
			data: [{path: this.path}],
			pickable: true,
			widthScale: 20,
			widthMinPixels: 2,
			getPath: d => d.path,
			getColor: d => [255, 140, 0],
			getWidth: d => 1,
			rounded: true,		
		});

		return (
			<div className="RenderMap">			
				<NavInput />
				<DeckGL
					initialViewState={this.viewport}
					height="100%"
					width="100%"
					controller={true} // allows the user to move the map around
					layers={[this.pathLayer]}
				>
					<StaticMap
						mapStyle="mapbox://styles/fartrekker/ck3ut11zx2cgj1cs4uz06ahu2"
						mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
					/>
				</DeckGL>
			</div>
		);
	}
}


class NavInput extends React.Component {
	render() {
		return(
			<div className="NavInput">
				<div style={{position: "absolute", top: "0px", left: "0px"}}>
				<form>				
					Start Position:
				<input type="text" name="startPosition"
					onChange={(event) => {this.startPosition = event.target.value}}
				/>
				<br />
				End Position:
				<input type="text" name="endPosition"
					onChange={(event) => {this.endPosition = event.target.value}}
				/>
				<br />
				Weight:
				<input type="range" name="weight"
					min="0" max="100" step="1"
					onChange={(event) => {this.weight = event.target.value/100.0}}
				/>
				<br />
				<input type="button" value="Calculate Path"
					onClick={this.updatePathLayer}
				/>
				</form>
				</div>
			</div>
		);
	}
}

export default Renderer;
