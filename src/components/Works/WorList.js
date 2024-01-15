import React, { useState, useEffect } from "react";
import Requests from "../API/RequestsDB";
import styled from "styled-components";
import { Link } from "react-router-dom";
import WorkForm from "./WorForm";
const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  padding: 8px 12px;
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3`
  margin-bottom: 10px;
  color: #333;
`;

const CardInfo = styled.p`
  margin-bottom: 8px;
  color: #666;
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c62828;
  }
`;

const WorkList = () => {
  const [dataAll, setDataAll] = useState([]);

  useEffect(() => {
    async function Fetching() {
      try {
        const response = await Requests.getWork();
        setDataAll(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    Fetching();
  }, []);

  const create = (newWork) => {
    if (dataAll) {
      setDataAll([...dataAll, newWork]);
    } else {
      setDataAll([newWork]);
    }
  };

  async function workDeletion(workId) {
    await Requests.deleteWork(workId);
    setDataAll(dataAll.filter((item) => item.Kod_work != workId));
  }

  return (
    <div>
      <Title>Список работ</Title>
      <WorkForm create={create} dataAll={dataAll} />
      <CardContainer>
        {Array.isArray(dataAll) && dataAll.length > 0 ? (
          dataAll.map((contract) => (
            <Card key={contract.Kod_work}>
              <CardTitle>{contract.Work_start_date}</CardTitle>
              <CardInfo>Дата начала: {contract.Work_start_date}</CardInfo>
              <CardInfo>Дата окончания: {contract.Work_end_date}</CardInfo>
              <DeleteButton onClick={() => workDeletion(contract.Kod_work)}>
                Удалить
              </DeleteButton>
              <StyledLink to={`/work/${contract.Kod_work}`}>
                Редактировать
              </StyledLink>
            </Card>
          ))
        ) : (
          <Title>Список работ пуст</Title>
        )}
      </CardContainer>
    </div>
  );
};

export default WorkList;
