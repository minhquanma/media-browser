import Container from "@mui/material/Container";
import { useRouter } from "next/router";

export default function Home(props) {
  const router = useRouter();
  const { id, search } = router.query;
  return (
    <Container maxWidth="md">
      <h2>Route: {id}</h2>
      <h2>Search: {search}</h2>
    </Container>
  );
}
