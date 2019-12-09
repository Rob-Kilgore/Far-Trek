import React from 'react';
import switch_icon from './switch_icon.svg';

class NavInput extends React.Component {
  render() {
    return(
        <div className="NavInput">
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
          <form action="">
            <input type="text" name="start" placeholder="start" maxlength="100"/>
            <img src={switch_icon} />
            <input type="text" name="destination" placeholder="destination" maxlength="100"/>
            <button type="submit">navigate me</button>
          </form>
        </div>
    );
  }
}

export default NavInput;