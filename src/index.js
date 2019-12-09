import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Import components
import Renderer from './components/nav/route/Renderer';
import Searchbar from './components/search/Searchbar';
// import DetailsPane from './components/nav/details/DetailPane';
// import TurnLI from './components/nav/directions/TurnLI';
// import FAButton from './components/fabs/FAButton';

ReactDOM.render(
                <div>
                    <Searchbar />
                    <Renderer />
                </div>, document.getElementById('root'));