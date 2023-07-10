import { useEffect, useState, useRef } from "react";

export function useFetch(url, fetchOptions, dependencies = null) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchData(url, options = {}) {
      if (!isLoading || error) {
        setIsLoading(true);
        setError(null);
      }

      if (controllerRef.current) controllerRef.current.abort();
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
        if (!isMounted) return;

        console.error(err);
        setError(err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
          controllerRef.current = null;
        }
      }
    }

    fetchData(url, fetchOptions);

    return () => {
      isMounted = false;
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, dependencies || [url]);

  const anticipateFetch = () => {
    setIsLoading(true);
    setError(null);
  };

  return [isLoading, error, data, anticipateFetch];
}
