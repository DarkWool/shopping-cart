import { useEffect, useState, useRef } from "react";

export function useFetch(url, fetchOptions, dependencies = null) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    async function fetchData(url, options = {}) {
      if (!isLoading || error) {
        setIsLoading(true);
        setError(null);
      }

      if (controllerRef.current) controllerRef.current.abort();

      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const res = await fetch(url, {
          signal: controllerRef.current.signal,
          ...options,
        });

        if (res.ok === false) throw new Error({ code: res.code, msg: res.message });

        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
        controllerRef.current = null;
      }
    }

    fetchData(url, fetchOptions);
  }, dependencies || [url]);

  const anticipateFetch = () => {
    setIsLoading(true);
    setError(null);
  };

  return [isLoading, error, data, anticipateFetch];
}
