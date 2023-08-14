import { useState } from "react";
import axios from "@/config/axios";
import { useEffect } from "react";

const useFetching = (method, url, autoFetch, config = {} ) => {

  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetching = async (data = {}) => {
    try {
      setIsLoading(true);

      const response = await axios.request({ 
        method, 
        url, 
        ...config,
        ...data,
      });
      setResponse(response.data.data);
      return response.data.data;
    } 
    catch (err) {
      setError(err.response.data.message);
      throw err.response.data.message
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(autoFetch) fetching()
  },[])

  return [ isLoading, fetching, response, error ];

}

export default useFetching;