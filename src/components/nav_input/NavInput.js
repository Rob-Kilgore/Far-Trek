import React from 'react';
import switch_icon from './switch_icon.svg';

class NavInput extends React.Component {
    render() {
      return(
          <div class="wrapper-box">
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