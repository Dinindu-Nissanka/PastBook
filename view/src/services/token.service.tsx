import { FC, useState } from 'react';

type Token = {
  email: string;
  name: string;
  token: string;
};

export const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');

    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      return userToken?.token;
    }
    return null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: Token | null) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    if (userToken !== null) {
      setToken(userToken.token);
    } else {
      setToken(null);
    }
  };

  return {
    setToken: saveToken,
    token,
  };
};
