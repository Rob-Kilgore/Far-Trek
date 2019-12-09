import React from 'react';
import './Searchbar.css';
import search_icon from './search_icon.png';

class Searchbar extends React.Component {
  render() {
    return(
      <div className="Searchbar">
        <form class="searchbar" action="">
          <input id="search-box" type="text" name="searchbar" placeholder="search for a destination..." maxlength="100"/>
          <button id="search-btn" type="submit"><img src={search_icon} alt="search icon" /></button>
        </form>
      </div>
    );
  }
}

export default Searchbar;