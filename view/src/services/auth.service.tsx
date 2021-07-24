type UserLogin = {
  username: string;
  password: string;
};

type UserSignUp = {
  username: string;
  password: string;
  name: string;
};

// Service to call the login endpoint in backend
export const login = async (loginInput: UserLogin) => {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: loginInput.username,
      password: loginInput.password,
    }),
  }).then((data) => data.json());
};

//Service to call the sign up endpoint in backend
export const signUp = async (signUpInput: UserSignUp) => {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: signUpInput.username,
      password: signUpInput.password,
      name: signUpInput.name,
    }),
  }).then((data) => data.json());
};

export const getAuthHeader = (): string | null => {
  const userString = localStorage.getItem('token');

  if (userString) {
    const user: {
      email: string;
      name: string;
      token: string;
    } = JSON.parse(userString);

    if (user && user.token) {
      return `Bearer ${user.token}`;
    }
  }

  return null;
};
