import Monitor from "../Monitor/Monitor";
import styled from "styled-components";
import Router from "../../components/Router";
import Navbar from "../Navbar/Navbar";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

function App() {
  return (
    <Container>
      <Router />
    </Container>
  );
}

export default App;
