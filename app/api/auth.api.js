import ApiService from "services/api.service";

export async function login({ username, password }) {
  return await ApiService.post("/login", {
    username: username,
    password: password,
  });
}

export async function refreshToken({ accessToken, refreshToken }) {
  return await ApiService.post("/refreshToken", {
    accessToken,
    refreshToken,
  });
}
