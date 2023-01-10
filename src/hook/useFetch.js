import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch(url);
      const json = await res.json();
      setResponse(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false)
    }
  };

  return { response, error, loading };
}
export default useFetch;