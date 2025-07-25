import { useAuthStore } from "../store/auth";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export const login = async (email, password) => {
  try {
    const { data, status } = await axios.post("user/token/", {
      email,
      password,
    });

    if (status === 200) {
      // data.access is the access token, and data.refresh is the refresh token
      setAuthUser(data.access, data.refresh);
    }

    return { data, error: null };
  } catch (error) {
    console.error("Login failed:", error);
    return {
      data: null,
      error: error.response.data?.detail || "Algo salio mal.",
    };
  }
};

export const register = async (
  full_name,
  email,
  phone,
  password,
  password2
) => {
  try {
    const { data } = await axios.post("user/register/", {
      full_name,
      email,
      phone,
      password,
      password2,
    });

    await login(email, password);

    // Si llega hasta aqui, significa que el registro fue exitoso.

    return { data, error: null };
  } catch (error) {
    console.error("Registration failed:", error);
    return {
      data: null,
      error: error.response.data?.detail || "Algo salio mal.",
    };
  }
};

export const logout = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  useAuthStore.getState().setUser(null);

  // Alert: Signed out successfully
};

export const setUser = async () => {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  if (!accessToken || !refreshToken) {
    return;
  }

  if (isAccessTokenExpired(accessToken)) {
    const response = await getRefreshToken(refreshToken);
    setAuthUser(response.access, response.refresh);
  } else {
    setAuthUser(accessToken, refreshToken);
  }
};

export const setAuthUser = (access_token, refresh_token) => {
  Cookies.set("access_token", access_token, { expires: 1, secure: true });
  Cookies.set("refresh_token", refresh_token, { expires: 7, secure: true });

  const user = jwt_decode(access_token) ?? null;

  if (user) {
    useAuthStore.getState().setUser(user);
  }

  useAuthStore.getState().setLoading(false);
};

export const getRefreshToken = async () => {
  const refreshToken = Cookies.get("refresh_token");
  const response = await axios.post("user/token/refresh/", {
    refresh: refreshToken,
  });

  return response.data;
};

export const isAccessTokenExpired = (accessToken) => {
  try {
    const decodedToken = jwt_decode(accessToken);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }
};