import { compareSync } from "bcryptjs";

const USERS = {
  admin: {
    hashedPassword:
      "$2a$04$4rqJiWmh.RoyRdeCdKpTmeHe.0zawzkQ0eINjJhfukQZyqd6tf9AG",
  },
};

export function getUserInfo({ username, password }) {
  const user = USERS[username];

  if (!user) {
    throw new Error("Login failed");
  }

  if (!compareSync(password, user.hashedPassword)) {
    throw new Error("Login failed");
  }

  return {
    ok: true,
    message: "Login successful",
  };
}
