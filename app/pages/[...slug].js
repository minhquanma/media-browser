import Container from "@mui/material/Container";
import { useRouter } from "next/router";

// http://localhost:3000/2016/4/5?search=555
export default function Home(props) {
  const router = useRouter();
  const { slug, search } = router.query;
  return (
    <Container maxWidth="md">
      <h2>Route: {JSON.stringify(slug)}</h2>
      <h2>Search: {search}</h2>
    </Container>
  );
}
