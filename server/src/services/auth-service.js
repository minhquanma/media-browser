import { compareSync } from "bcryptjs";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PASSPORT } from "commons/const";

export const USERS = {
  admin: {
    hashedPassword:
      "$2a$04$4rqJiWmh.RoyRdeCdKpTmeHe.0zawzkQ0eINjJhfukQZyqd6tf9AG",
  },
};

export function getUserInfo({ username, password }) {
  const user = USERS[username];

  if (!user) {
    return { ok: false };
  }

  if (!compareSync(password, user.hashedPassword)) {
    return { ok: false };
  }

  return {
    ok: true,
    message: "Login successful",
  };
}

export const applyPassportStrategy = (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = PASSPORT.SECRET;
  passport.use(
    new Strategy(options, (payload, done) => {
      const user = USERS[payload.username];

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );
};
