import { createContext, useContext, useState, useEffect } from "react";
import { loginApi,logoutApi } from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // App start hone pr localStorage se data load karo
  useEffect(() => {
    const storedAccess = localStorage.getItem("accessToken");
    const storedRefresh = localStorage.getItem("refreshToken");
    const storedUser = localStorage.getItem("user");

    if (storedAccess && storedRefresh && storedUser) {
      setAccessToken(storedAccess);
      setRefreshToken(storedRefresh);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await loginApi(email, password);
    const { accessToken, refreshToken, user } = res.token;

    // State update
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);

    // LocalStorage mein save karo
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  };

 const logout = async () => {
  try {
    const storedRefresh = localStorage.getItem("refreshToken");
    if (storedRefresh) {
      await logoutApi(storedRefresh); // Backend pe revoke
    }
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    // Chahe API fail ho — frontend clear karo
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
};




  const updateTokens = (newAccessToken, newRefreshToken) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  };

  const isAdmin = user?.roles?.includes("Admin");
  const isLoggedIn = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        loading,
        isLoggedIn,
        isAdmin,
        login,
        logout,
        updateTokens,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
