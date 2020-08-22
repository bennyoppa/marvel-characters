import { useState, useEffect } from "react";
import axios from "axios";

const initErr = {
  isError: false,
  errMessage: "",
};

const useFetchApi = (url, method, parameter) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(initErr);
  let res;

  const fetch = async () => {
    try {
      if (method === "get") {
        res = await axios.get(url);
      }

      if (res && res.status === 200) {
        setResult(res.data.data.results);
        setLoading(!loading);
      } else {
        setErr({
          isError: true,
          errMessage: "Fetch failed.",
        });
      }
    } catch (err) {
      setErr({
        isError: true,
        errMessage: err,
      });
    }
  };

  // componentDidMount - only load once
  useEffect(() => {
    fetch();
  }, []);

  return [loading, result, err];
};

export default useFetchApi;
