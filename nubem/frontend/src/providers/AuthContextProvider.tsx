import { PropsWithChildren, useState } from "react";
import { AuthContext, User } from "../contexts/AuthContext";
import axios from "axios";

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    const response = await axios({
      method: "POST",
      url: "http://127.0.0.1:5001/login",
      data: {
        email,
        password,
      },
    });
    const user = response.data;
    setUser(user);
  };

  const register = async (
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    role: string
  ): Promise<void> => {
    await axios({
      method: "POST",
      url: "http://127.0.0.1:5001/register",
      data: {
        email,
        firstname: firstName,
        lastname: lastName,
        username,
        password,
        role,
      },
    });
  };

  const logout = async () => {
    try {
      await axios({
        method: "POST",
        url: "http://127.0.0.1:5001/logout",
      });
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
