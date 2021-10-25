import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestion(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function fatchQuestions() {
      const db = getDatabase(); //db connection
      const quizTblRef = ref(db, "quiz/" + videoID + "questions"); //db connection and table name from database firebase
      const quizQuery = query(quizTblRef, orderByKey());
      try {
        setError(false);
        setLoading(true);
        //request firebase database
        const snapshot = await get(quizQuery); //data reference store on snapshot
        // console.log(snapshot.val());
        setLoading(false);
        if (snapshot.exists()) {
          setQuestions((prevQuestion) => {
            return [...prevQuestion, ...Object.values(snapshot.val())]; //data store on snapshot
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fatchQuestions();
  }, [videoID]);
  return {
    loading,
    error,
    questions,
  };
}
