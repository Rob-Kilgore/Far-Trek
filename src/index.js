import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Import components
import App from './App';
import Searchbar from './components/search/Searchbar';
import DetailPane from './components/nav/details/DetailPane';
import TurnLI from './components/nav/directions/TurnLI';
// import FAButton from './components/fabs/FAButton';

ReactDOM.render(
                <div>
                    <Searchbar />
                    <DetailPane />
                    <App />
                </div>, document.getElementById('root'));