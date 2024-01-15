import React, { useState, useEffect } from "react";
import Requests from "../API/RequestsDB";
import styled from "styled-components";
import EmpForm from "../Employees/EmpForm";
import { Link } from "react-router-dom";

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

const EmpList = () => {
  const [dataAll, setDataAll] = useState([]);

  useEffect(() => {
    async function EmpFetching() {
      try {
        const response = await Requests.getEmployee();
        setDataAll(response.data);
      } catch (error) {}
    }
    EmpFetching();
  }, []);

  const create = (newEmp) => {
    if (dataAll) {
      setDataAll([...dataAll, newEmp]);
    } else {
      setDataAll([newEmp]);
    }
  };

  async function EmpDeletion(empDelete) {
    await Requests.deleteEmployee(empDelete);
    setDataAll(dataAll.filter((emp) => emp.Kod_employee !== empDelete));
  }

  return (
    <div>
      <Title>Список сотрудников</Title>
      <EmpForm create={create} dataAll={dataAll} />
      <CardContainer>
        {Array.isArray(dataAll) && dataAll.length > 0 ? (
          dataAll.map((emp) => (
            <Card key={emp.Employee_id}>
              <CardTitle>{emp.Employee_fio}</CardTitle>
              <CardInfo>ФИО: {emp.Employee_fio}</CardInfo>
              <CardInfo>Должность: {emp.Employee_post}</CardInfo>
              <CardInfo>Номер: {emp.Employee_number}</CardInfo>
              <CardInfo>Пол: {emp.Employee_gender}</CardInfo>
              <CardInfo>Адрес: {emp.Employee_address}</CardInfo>
              <CardInfo>Дата: {emp.Employee_date}</CardInfo>
              <DeleteButton onClick={() => EmpDeletion(emp.Kod_employee)}>
                Удалить
              </DeleteButton>
              <StyledLink to={`/employee/${emp.Kod_employee}`}>
                Редактировать
              </StyledLink>
            </Card>
          ))
        ) : (
          <Title>Список сотрудников пуст</Title>
        )}
      </CardContainer>
    </div>
  );
};

export default EmpList;
