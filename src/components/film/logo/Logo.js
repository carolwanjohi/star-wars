import * as React from 'react';
import PropTypes from 'prop-types';
import logo from './Logo.svg';
import styles from './logo.module.css'

function Logo({characters}) {
  if(characters && characters.length > 0) {
    return null;
  }

  return (
    <img src={logo} alt="Star wars yellow logo" className={styles.logo}/>
  )
}

Logo.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    gender: PropTypes.string,
    height: PropTypes.string,
    personId: PropTypes.string,
  })).isRequired,
}

export default Logo;
