import {
    get, getDatabase, limitToFirst, orderByKey, query, ref, startAt,
   } from 'firebase/database';
import { useEffect, useState } from 'react';

export default function userVideoList(page) {
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(false);
        const [videos, setVideos] = useState([]);
        const [hasMore, setHasMore] = useState(true);
        useEffect(() => {
            async function fetchVideos() {
                  const db = getDatabase();
                  const videoRef = ref(db, 'videos');
                   const videoQuery = query(
                    videoRef,
                    orderByKey(),
                     startAt(`${page}`),
                     limitToFirst(8),
);
                try {
                    setError(false);
                    setLoading(true);
                   const snapshot = await get(videoQuery);
                   setLoading(false);
                   if (snapshot.exists()) {
                    const newVideos = Object.values(snapshot.val());
                    // eslint-disable-next-line max-len
                    setVideos((prevVideos) => {
                      // eslint-disable-next-line max-len
                      const uniqNewVideos = newVideos.filter((newVideo) => !prevVideos.some((prevVideo) => prevVideo.youtubeID === newVideo.youtubeID));
                      return [...prevVideos, ...uniqNewVideos];
                    });
                } else {
                    setHasMore(false);
                }
                  } catch (err) {
                     console.log(err);
                    setLoading(false);
                     setError(true);
        }
}
                fetchVideos();
             }, [page]);
  return {
    loading,
    error,
    videos,
    hasMore,
  };
}
