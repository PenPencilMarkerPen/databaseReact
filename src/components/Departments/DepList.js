import React, { useState, useEffect } from "react";
import Requests from "../API/RequestsDB";
import styled from "styled-components";
import DepForm from "../Departments/DepForm";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";

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

const DepList = () => {
  const [dataAll, setDataAll] = useState([]);
  useEffect(() => {
    async function DepFetching() {
      try {
        const responce = await Requests.getDepartments();
        setDataAll(responce.data);
      } catch (error) {
        console.error(error);
      }
    }
    DepFetching();
  }, []);

  const create = (newDep) => {
    if (dataAll) {
      setDataAll([...dataAll, newDep]);
    } else {
      setDataAll([newDep]);
    }
  };

  async function DepFetching(data) {
    const responce = await Requests.deleteDepartments(data);
  }
  const delet = (DepDelete) => {
    setDataAll(dataAll.filter((dep) => dep.Kod_department !== DepDelete));
    DepFetching(DepDelete);
  };

  return (
    <div>
      <Title>Список отделов</Title>
      <DepForm create={create} dataAll={dataAll} />
      <CardContainer>
        {Array.isArray(dataAll) && dataAll.length > 0 ? (
          dataAll.map((dep) => (
            <Card key={dep.Kod_department}>
              <CardTitle>{dep.Department_name}</CardTitle>
              <CardInfo>Название отдела: {dep.Department_name}</CardInfo>
              <CardInfo>Этаж: {dep.Department_floor}</CardInfo>
              <CardInfo>Телефон: {dep.Department_phone}</CardInfo>
              <CardInfo>Начальник отдела: {dep.Department_fio}</CardInfo>
              <DeleteButton onClick={() => delet(dep.Kod_department)}>
                Удалить
              </DeleteButton>
              <StyledLink to={`/department/${dep.Kod_department}`}>
                Редактировать
              </StyledLink>
            </Card>
          ))
        ) : (
          <Title>Список отделов пуст</Title>
        )}
      </CardContainer>
    </div>
  );
};

export default DepList;
