function apiUrl(path) {
  return new URL(`${process.env.REACT_APP_API_URL}/${path}`);
}

// function authHeader(url) {
//   const { user } = useAuthStore();
//   const isLoggedIn = !!user?.token;
//   const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
//   if (isLoggedIn && isApiUrl) {
//     return { Authorization: `Bearer ${user.token}` };
//   } else {
//     return {};
//   }
// }

export { apiUrl };
