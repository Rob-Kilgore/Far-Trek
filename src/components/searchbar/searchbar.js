import React from 'react';
import style from './Searchbar.css';
import search_icon from './search_icon.svg';

class Searchbar extends React.Component {
    render() {
      return(
          <div>
            <form class={style.searchbar} action="">
              <input class={style.searchbar} type="text" name="searchbar" placeholder="search for a destination..." maxlength="100"/>
              <button class={style.searchbar} type="submit"><img src={search_icon} /></button>
            </form>
          </div>
      );
    }
  }

export default Searchbar;