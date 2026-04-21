import { createContext, useContext, useState, useEffect } from "react";
import { loginApi, logoutApi, getMyPermissions } from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const storedAccess = localStorage.getItem("accessToken");
    const storedRefresh = localStorage.getItem("refreshToken");
    const storedUser = localStorage.getItem("user");
    const storedPermissions = localStorage.getItem("permissions");

    if (storedAccess && storedRefresh && storedUser) {
      setAccessToken(storedAccess);
      setRefreshToken(storedRefresh);
      setUser(JSON.parse(storedUser));
      setPermissions(storedPermissions ? JSON.parse(storedPermissions) : []);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await loginApi(email, password);
    const { accessToken, refreshToken, user } = res.token;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));

    // Permissions fetch karo login ke baad
    try {
      const permRes = await getMyPermissions();
      if (permRes.success) {
        setPermissions(permRes.data);
        localStorage.setItem("permissions", JSON.stringify(permRes.data));
      }
    } catch (err) {
      console.error("Permissions fetch error:", err);
      setPermissions([]);
    }

    return user;
  };

  const logout = async () => {
    try {
      const storedRefresh = localStorage.getItem("refreshToken");
      if (storedRefresh) {
        await logoutApi(storedRefresh);
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      setPermissions([]);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("permissions");
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

  // Permission check helper
  const hasPermission = (permission) => {
    if (isAdmin) return true; // Admin ko sab permissions
    return permissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        loading,
        isLoggedIn,
        isAdmin,
        permissions,
        hasPermission,
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