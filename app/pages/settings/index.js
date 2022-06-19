import { Container } from "@mui/material";
import AppLayout from "~/components/AppLayout/AppLayout";

const Settings = () => {
  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        Settings
      </Container>
    </AppLayout>
  );
};

Settings.auth = true;
export default Settings;
