import React from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "./initFirebase";
import { removeTokenCookie, setTokenCookie } from "./tokenCookies";

initFirebase();

interface IAuthContext {
  user: firebase.User | null;
  logout: () => void;
  authenticated: boolean;
}

const AuthContext = React.createContext<IAuthContext>({
  user: null,
  logout: () => null,
  authenticated: false,
});

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const router = useRouter();

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken();
          setTokenCookie(token);
          setUser(user);
        } else {
          removeTokenCookie();
          setUser(null);
        }
      });

    return () => {
      cancelAuthListener();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, authenticated: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context)
    throw new Error("Auth Context must be called inisde AuthContext Provider");

  return context;
};

export { AuthProvider };
