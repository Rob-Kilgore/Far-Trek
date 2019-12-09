import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Import components
import RenderMap from './components/nav/route/RenderMap';
// import Searchbar from './components/search/Searchbar';
import NavInput from './components/nav/NavInput';

ReactDOM.render(
                <div>
                    <NavInput />
                    <RenderMap />
                </div>, document.getElementById('root'));