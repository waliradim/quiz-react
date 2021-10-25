import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";
export default function useVideoList(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, sethasMore] = useState(true);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function fatchVideo() {
      const db = getDatabase(); //db connection
      const videoTblRef = ref(db, "videos"); //db connection and table name from database firebase
      const videoQuery = query(
        videoTblRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(8)
      );
      try {
        setError(false);
        setLoading(true);
        //request firebase database
        const snapshot = await get(videoQuery); //data reference store on snapshot
        // console.log(snapshot.val());
        setLoading(false);
        if (snapshot.exists()) {
          setVideos((preVideos) => {
            return [...preVideos, ...Object.values(snapshot.val())]; //data store on snapshot
          });
        } else {
          sethasMore(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    fatchVideo();
  }, [page]);
  return {
    loading,
    error,
    videos,
    hasMore,
  };
}
