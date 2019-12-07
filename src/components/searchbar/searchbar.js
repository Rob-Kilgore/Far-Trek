import React from 'react';
import search_icon from './search_icon.svg';

class Searchbar extends React.Component {
    render() {
      return(
          <div class="wrapper-box">
            <form action="">
              <input type="text" name="searchbar" placeholder="search for a destination..." maxlength="100"/>
              <button type="submit"><img src={search_icon} /></button>
            </form>
          </div>
      );
    }
  }