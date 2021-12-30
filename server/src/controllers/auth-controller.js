import { PASSPORT } from "commons/const";
import { getUserInfo } from "services/auth-service";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export function makeLoginApi({ getUserInfo }) {
  return (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const { ok } = getUserInfo({ username, password });

    if (!ok) {
      res.sendStatus(403);
    }

    // Sign token
    const accessToken = jwt.sign({ username }, PASSPORT.SECRET, {
      expiresIn: PASSPORT.TOKEN_EXPIRES,
    });

    const refreshToken = jwt.sign({ username }, PASSPORT.REFRESH_SECRET, {
      expiresIn: PASSPORT.REFRESH_TOKEN_EXPIRES,
    });

    const userToReturn = { username, accessToken, refreshToken };

    res.status(200).json(userToReturn);
  };
}

export function makeRefreshTokenApi() {
  return (req, res) => {
    // check accessToken
    // if still valid return
    // if not valid check refresh token
    // if still valid resign accessToken
    // if not valid revoke token return error

    const { accessToken, refreshToken } = req.body;

    jwt.verify(accessToken, PASSPORT.SECRET, (accessTokenErr, decoded) => {
      // Access token is not valid
      if (accessTokenErr) {
        // Check refresh token
        jwt.verify(
          refreshToken,
          PASSPORT.REFRESH_SECRET,
          (refreshTokenErr, decoded) => {
            if (refreshTokenErr) {
              res.sendStatus(403);
            } else {
              // Sign token
              const newAccessToken = jwt.sign(
                { username: decoded.username },
                PASSPORT.SECRET,
                {
                  expiresIn: PASSPORT.TOKEN_EXPIRES,
                }
              );

              res.status(200).json({
                isRefreshed: true,
                accessToken: newAccessToken,
                refreshToken,
              });
            }
          }
        );
      } else {
        // Access token is still valid
        res.status(200).json({
          isRefreshed: false,
          accessToken,
          refreshToken,
        });
      }
    });
  };
}

export const loginValidation = [
  check("username").exists().withMessage("User name is empty"),
  check("password").exists().withMessage("Password is empty"),
];

export const loginApi = makeLoginApi({ getUserInfo });
export const refreshTokenApi = makeRefreshTokenApi();
