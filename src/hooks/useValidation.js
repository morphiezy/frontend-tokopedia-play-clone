import { useEffect } from "react";
import { useState } from "react";

const useValidation = (type) => {

  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  const validator = {
    username: /^[a-zA-Z0-9]{4,12}$/,
    password:
      /^(?=.*[A-Z])(?=.*[\d!@#$%^&*()\-_=+{}[\]\\|:;"'<>,.?\/]).{6,12}$/,
  };

  const validate = () => {

    if (!input.trim().length) {
      return setError(`${type} is required`);
    }

    if (type === "username" && !validator[type].test(input)) {
      return setError("username must 4-12 characters. Only alphabet & number.");
    } 
    else if (type === "password" && !validator[type].test(input)) {
      return setError(
        "password must 6-12 characters also contain one number & uppercase.",
      );
    }

    return true;

  };

  useEffect(() => {
    if (error) setError(null);
  }, [input]);

  return [input, setInput, error, validate];

};

export default useValidation;
