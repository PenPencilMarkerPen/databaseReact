import React, { useState } from "react";
import Requests from "../API/RequestsDB";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 30px auto;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const DepForm = ({ create, dataAll }) => {
  const [data, setData] = useState({
    Department_name: "",
    Department_floor: "",
    Department_phone: "",
    Department_fio: "",
  });
  async function DepFetching(formData) {
    const responce = await Requests.postDepartments(formData);
  }

  const AddDep = (e) => {
    e.preventDefault();
    if (
      data.Department_name &&
      data.Department_floor &&
      data.Department_phone &&
      data.Department_fio
    ) {
      DepFetching(data);
      create(data);
    } else {
      alert("Заполните все поля");
    }
  };

  return (
    <FormContainer onSubmit={AddDep}>
      <FormGroup>
        <Label htmlFor="Department_name">Название отдела</Label>
        <Input
          id="Department_name"
          type="text"
          value={data.Department_name}
          onChange={(e) =>
            setData({ ...data, Department_name: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Department_floor">Этаж</Label>
        <Input
          id="Department_floor"
          type="text"
          value={data.Department_floor}
          onChange={(e) =>
            setData({ ...data, Department_floor: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Department_phone">Телефон</Label>
        <Input
          id="Department_phone"
          type="text"
          value={data.Department_phone}
          onChange={(e) =>
            setData({ ...data, Department_phone: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Department_fio">Начальник отдела</Label>
        <Input
          id="Department_fio"
          type="text"
          value={data.Department_fio}
          onChange={(e) => setData({ ...data, Department_fio: e.target.value })}
        />
      </FormGroup>
      <Button type="submit">Добавить</Button>
    </FormContainer>
  );
};

export default DepForm;
