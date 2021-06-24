import cookies from "js-cookie";

const getTokenCookie = () => cookies.get("token");

const setTokenCookie = (token: string) => {
  cookies.set("token", token, { expires: 1 / 24 });
};

const removeTokenCookie = () => cookies.remove("token");

export { getTokenCookie, setTokenCookie, removeTokenCookie };
