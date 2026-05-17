import { useEffect, useState } from "react";

import { auth } from "../firebase";

import { onAuthStateChanged } from "firebase/auth";


const useAuth = () => {

  const [user, setUser] = useState(null);

  const [authLoading, setAuthLoading] = useState(true);


  useEffect(() => {

    const unsub = onAuthStateChanged(auth, (u) => {

      setUser(u);

      setAuthLoading(false);

    });

    return () => unsub();

  }, []);


  return {
    user,
    authLoading
  };

};

export default useAuth;