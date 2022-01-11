import * as React from 'react';
import styles from './openingCrawl.module.css'

function OpeningCrawl({openingCrawl}) {

  return (
    <section>
    <p className={styles.openingCrawl}>
     <div style={{whiteSpace: "pre-line"}}>
      {openingCrawl}
    </div>

    </p>
    </section>
  )
}

export default OpeningCrawl;
