import React, {useState} from 'react';
import ReactMapGL from "react-map-gl";
import './RenderMap.css';
import {getPath} from '../../../navigation/Navigate';
import DeckGL from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';
import {PathLayer} from '@deck.gl/layers';
import { render } from '@testing-library/react';

import Searchbar from '../../search/Searchbar';

function RenderMap() {

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
	};

	return (
		<div className="RenderMap">			
			<Searchbar />
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
		</div>
	);
}

export default RenderMap;
