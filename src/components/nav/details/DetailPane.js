import React from 'react';
import './DetailPane.css';
import TurnLI from '../directions/TurnLI';

class DetailPane extends React.Component {
  render() {
    return(
        <div className="DetailPane">
          <div class="pane">
          <h2>Route</h2><h3>X miles</h3>
          <br />
          <TurnLI />
        </div>
      </div>
    );
  }
}

export default DetailPane;