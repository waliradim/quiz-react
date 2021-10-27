import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswer(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fatchAnswer() {
      const db = getDatabase(); //db connection
      const answerTblRef = ref(db, "answers/" + videoID + "/questions"); //db connection and table name from database firebase
      const answerQuery = query(answerTblRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        //request firebase database
        const snapshot = await get(answerQuery); //data reference store on snapshot

        setLoading(false);
        if (snapshot.exists()) {
          setAnswers((prevAnswers) => {
            return [...prevAnswers, ...Object.values(snapshot.val())]; //data store on snapshot
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fatchAnswer();
  }, [videoID]);
  return {
    loading,
    error,
    answers,
  };
}
