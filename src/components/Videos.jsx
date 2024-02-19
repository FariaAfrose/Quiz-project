import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useEffect, useState } from 'react';
import classes from '../styles/Video.module.css';
import Video from './Video';
import useVideoList from '../hooks/useVideoList';

export default function Videos() {
    const [page, setPage] = useState(1);
    const {
 loading, error, videos, hasMore,
} = useVideoList(page);

const loadmoreVideo = () => {
  setPage(page + 8);
  console.log('page ', page);
};
useEffect(() => {
  console.log('Fetching ', page);
}, [page]);
console.log(videos);
  return (
    <div className={classes.videos}>
      {videos.length > 0 && (
      <InfiniteScroll
        dataLength={videos.length}
        hasMore={hasMore}
        loader="Loading..."
        next={loadmoreVideo}
      >
        {videos.map((video, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={`${video.youtubeID} -${index}`}>
            { video.noq > 0 ? (
              <Link
                to={`/quiz/${video.youtubeID}`}
                state={
                { videoTitle: video.title }

            }
                key={`${video.youtubeID}-{index}`}

              >
                <Video
                  title={video.title}
                  id={video.youtubeID}
                  noq={video.noq}
                />
              </Link>
            ) : (

              <Video
                title={video.title}
                id={video.youtubeID}
                noq={video.noq}
                key={`${video.youtubeID}-{index}`}
              />
            )}
          </React.Fragment>
        ))}

      </InfiniteScroll>
 )}
      {!loading && videos.length === 0 && <div>No data found!</div>}
      {error && <div>There was an error! </div>}
      {loading && <div>Loading... </div>}
    </div>
  );
}
