import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import DrawerResponsive from "../../layout/navbar/DrawerResponsive";

const Home = () => {

  return (
    <div style={{ marginTop: "5rem", marginBottom: "5rem" }}>
      <ThemeProvider theme={theme}>
        <h1>Este es el home</h1>
        <DrawerResponsive />
      </ThemeProvider>
    </div>
  );
};

export default Home;
