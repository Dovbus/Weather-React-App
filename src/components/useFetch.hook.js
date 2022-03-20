import React, { useState } from 'react';

export default function useFetch(BaseUrl) {
  const [loading, setLoading] = useState(false);

  function get(url) {
    return new Promise((resolve, reject) => {
      setLoading(true);
      fetch(BaseUrl + url)
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            setLoading(false);
            return reject(data);
          }
          setLoading(false);
          resolve(data);
        })
        .catch((error) => {
          setLoading(false);
          reject(error);
        });
    });
  }
  return { get, loading };
}
