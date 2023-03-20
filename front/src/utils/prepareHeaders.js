export const prepareHeaders = (headers, api) => {
  const token = cookies.get("op_client_token");
  if (token) {
    headers.set("X-Access-Token", token);
  }
  return headers;
};
