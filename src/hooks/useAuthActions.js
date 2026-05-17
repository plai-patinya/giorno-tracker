import {
  loginUser,
  registerUser,
  logoutUser
} from "../services/firebaseService";

const useAuthActions = ({

  email,
  password,

  showError

}) => {

  const login = async () => {

    try {

      await loginUser(
        email,
        password
      );

    } catch (e) {

      showError(e.message);

    }

  };

  const register = async () => {

    try {

      await registerUser(
        email,
        password
      );

    } catch (e) {

      showError(e.message);

    }

  };

  const logout = async () => {

    try {

      await logoutUser();

    } catch (e) {

      showError(e.message);

    }

  };

  return {

    login,
    register,
    logout

  };

};

export default useAuthActions;