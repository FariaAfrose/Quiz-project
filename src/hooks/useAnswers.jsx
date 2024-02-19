import { useEffect, useState } from 'react';

import {
    get, getDatabase, orderByKey, query, ref,
   } from 'firebase/database';

export default function useAnswers(videoID) {
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(false);
        const [answers, setAnswers] = useState([]);
        useEffect(() => {
            async function fetchAnswers() {
                  const db = getDatabase();
                  const answerRef = ref(db, `answers/${videoID}/questions`);
                   const answerQuery = query(answerRef, orderByKey());

                try {
                    // setError(false);
                    setLoading(true);
                   const snapshot = await get(answerQuery);
                   setLoading(false);
                 if (snapshot.exists()) {
                  const answerArray = Object.values(snapshot.val());
                  setAnswers(answerArray);
                } else {
                  setAnswers([]);
                }
                  } catch (err) {
                     console.error('Error fetching', err);
                    setLoading(false);
                     setError(true);
        }
}
             fetchAnswers();
             }, [videoID]);
  return {
    loading,
    error,
    answers,
  };
}
