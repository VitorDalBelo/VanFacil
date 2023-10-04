import React, { createContext } from "react";

import useAuth from "../../hooks/useAuth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const { loading, user, isAuth, handleLogin,handleGoogleLogin, handleLogout ,setUser,photoUri} = useAuth();

	return (
		<AuthContext.Provider
			value={{ loading, user, isAuth, handleLogin,handleGoogleLogin, handleLogout,setUser,photoUri }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
