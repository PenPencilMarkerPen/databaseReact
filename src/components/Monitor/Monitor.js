import React, { useEffect } from "react";
import Requests from "../API/RequestsDB";
import DepList from "../Departments/DepList";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const Monitor = () => {
  useEffect(() => {
    async function DepFetching() {
      try {
        const responce = await Requests.getDepartments();
        console.log(responce.data);
      } catch (error) {
        console.error(error);
      }
    }
    DepFetching();
  }, []);

  return (
    <Container>
      <DepList />
    </Container>
  );
};

export default Monitor;
