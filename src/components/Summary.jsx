import React, { useMemo } from 'react';
import classes from '../styles/Summary.module.css';
import successImage from '../assets/images/success.png';
import useFetch from '../hooks/useFetch';

export default function Summary({ score, noq }) {
  const getKeyword = useMemo(() => {
    if ((score / (noq * 5)) * 100 < 50) {
      return 'failed';
    } if ((score / (noq * 5)) * 100 < 75) {
      return 'good';
    } if ((score / (noq * 5)) * 100 < 100) {
      return 'very good';
    }
      return 'excellent';
  }, [score, noq]);
  const { loading, error, result } = useFetch(
`https://api.pexels.com/v1/search?query=${getKeyword}&per_page=1`,
  'GET',
{ Authorization: import.meta.env.VITE_REACT_APP_PEXELS_API_KEY },
  );
  const image = result ? result?.photos[0].src.medium : successImage;
  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        <p>
          Your score is
          {' '}
          <br />
          {score}
          {' '}
          out of
          {' '}
          {noq * 5}
        </p>
      </div>
      {loading && <div className={classes.badge}>Loading your badge...</div>}
      {error && <div className={classes.badge}>There was an error!</div>}
      {!loading && !error && (
        <div className={classes.badge}>
          <img src={image} alt="success" />
        </div>
      )}
    </div>
  );
}

// import React from 'react';
// import classes from '../styles/Summary.module.css';
// import image from '../assets/images/success.png';

// export default function Summary({ score, noq }) {
//   return (
//     <div className={classes.summary}>
//       <div className={classes.point}>
//         <p>
//           Your score is
//           {' '}
//           <br />
//           {score}
//           {' '}
//           out of
//           {' '}
//           {noq * 5}
//         </p>
//       </div>
//       <div className={classes.badge}>
//         <img src={image} alt="success" />
//       </div>
//     </div>
//   );
// }
