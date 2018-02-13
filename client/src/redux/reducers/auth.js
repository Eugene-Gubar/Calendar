import { LOGIN, LOGOUT } from "../../constants/constants";

const initialAuth = {
  authenticated: false,
  status: ""
};

export default function user(auth = initialAuth, action) {
  switch (action.type) {
    case LOGIN:
      return { ...auth, authenticated: true };
    case LOGOUT:
      return { ...auth, authenticated: false };
    default:
      return auth;
  }
}
