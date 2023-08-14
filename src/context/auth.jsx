import { useState, useEffect, createContext } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { getUser } from "@/services/user";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    username: "",
    picture: "",
  });

  const getUserInfo = async () => {
    const token = Cookies.get("token");
    const { _id } = jwtDecode(token);

    if (_id) {
      const userInfo = await getUser(_id);
      setUser({...userInfo});
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
