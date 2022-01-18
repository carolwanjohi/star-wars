import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './OpeningCrawl.module.css'

function OpeningCrawl({openingCrawl}) {

  if(!openingCrawl || !openingCrawl.length) {
    return null;
  }

  /* eslint-disable jsx-a11y/no-distracting-elements */
  return (
    <section>
      <marquee direction="up"  scrolldelay="500" height="500" className={styles.openingCrawl}>
        {openingCrawl}
      </marquee>
    </section>
  )
}

OpeningCrawl.propTypes = {
  openingCrawl: PropTypes.string.isRequired,
};

export default OpeningCrawl;
