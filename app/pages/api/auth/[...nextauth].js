import { login, refreshToken } from "api/auth.api";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { isEmpty } from "lodash";
// // http://localhost:3000/2016/4/5?search=555
// export default function Home(props) {
//   const router = useRouter();
//   const { slug, search } = router.query;
//   return (
//     <Container maxWidth="md">
//       <h2>Route: {JSON.stringify(slug)}</h2>
//       <h2>Search: {search}</h2>
//     </Container>
//   );
// }

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      name: "Credentials",
      authorize: async (credentials) => {
        const { username, password } = credentials;

        try {
          const auth = await login({ username, password });

          return auth;
        } catch (loginErr) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Getting the JWT token from API response
    async jwt(token, auth) {
      console.log(
        `jwt is called ${new Date().getMinutes()}:${new Date().getSeconds()}`,
        token
      );
      if (auth) {
        token.username = auth.username;
        token.accessToken = auth.accessToken;
        token.refreshToken = auth.refreshToken;
      } else {
        // Refresh token
        try {
          const res = await refreshToken({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
          });

          token.accessToken = res.accessToken;
          token.refreshToken = res.refreshToken;
        } catch (err) {
          token = {};
        }
      }

      return token;
    },
    async session(session, auth) {
      console.log("session is called", auth);

      if (isEmpty(auth)) {
        return {};
      }
      session.username = auth.username;
      session.accessToken = auth.accessToken;
      session.refreshToken = auth.refreshToken;

      return session;
    },
  },
});
