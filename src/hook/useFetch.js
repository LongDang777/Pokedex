import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      setResponse(json);
    } catch (error) {
      setError(error);
    }
  };

  return { response, error };
}
export default useFetch;