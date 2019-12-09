import React from 'react';
import styles from './Searchbar.css';
import search_icon from './search_icon.svg';

class Searchbar extends React.Component {
  render() {
    return(
      <div className="Searchbar">
        <form class={styles.searchbar} action="">
          <input class={styles.searchbar} type="text" name="searchbar" placeholder="search for a destination..." maxlength="100"/>
          <button class={styles.searchbar} type="submit"><img src={search_icon} /></button>
        </form>
      </div>
    );
  }
}

export default Searchbar;