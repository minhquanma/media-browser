import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { getUserInfo } from "utils/auth";

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
      async authorize(credentials) {
        return getUserInfo(credentials);
      },
    }),
  ],
});
