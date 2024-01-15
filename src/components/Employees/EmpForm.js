import React, { useState, useEffect } from "react";
import Requests from "../API/RequestsDB";
import styled from "styled-components";
import Select from "react-select";

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

const EmployeeForm = ({ create }) => {
  const [data, setData] = useState({
    Kod_department: "",
    Employee_fio: "",
    Employee_post: "",
    Employee_number: "",
    Employee_gender: "",
    Employee_address: "",
    Employee_date: "",
  });
  const [dataDepSelect, setDataDepSelect] = useState([]);
  useEffect(() => {
    async function DepFetching() {
      try {
        const responce = await Requests.getDepartments();
        const transformedData = responce.data.map((dep) => ({
          value: dep.Kod_department,
          label: dep.Department_name,
        }));
        setDataDepSelect(transformedData);
      } catch (error) {
        console.error(error);
      }
    }
    DepFetching();
  }, []);
  console.log(dataDepSelect);

  async function EmployeeFetching(formData) {
    console.log(data);
    const response = await Requests.postEmployee(formData);
  }

  const AddEmployee = (e) => {
    e.preventDefault();
    if (
      data.Kod_department &&
      data.Employee_fio &&
      data.Employee_post &&
      data.Employee_number &&
      data.Employee_gender &&
      data.Employee_address &&
      data.Employee_date
    ) {
      EmployeeFetching(data);
      create(data);
    } else {
      alert("Заполните все поля");
    }
  };

  return (
    <FormContainer onSubmit={AddEmployee}>
      <FormGroup>
        <Label htmlFor="Kod_department">Код отдела</Label>
        <Select
          options={dataDepSelect}
          onChange={(e) => setData({ ...data, Kod_department: e.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Employee_fio">ФИО сотрудника</Label>
        <Input
          id="Employee_fio"
          type="text"
          value={data.Employee_fio}
          onChange={(e) => setData({ ...data, Employee_fio: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Employee_post">Должность сотрудника</Label>
        <Input
          id="Employee_post"
          type="text"
          value={data.Employee_post}
          onChange={(e) => setData({ ...data, Employee_post: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Employee_number">Номер сотрудника</Label>
        <Input
          id="Employee_number"
          type="text"
          value={data.Employee_number}
          onChange={(e) =>
            setData({ ...data, Employee_number: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Employee_gender">Пол сотрудника</Label>
        <Input
          id="Employee_gender"
          type="text"
          value={data.Employee_gender}
          onChange={(e) =>
            setData({ ...data, Employee_gender: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Employee_address">Адрес сотрудника</Label>
        <Input
          id="Employee_address"
          type="text"
          value={data.Employee_address}
          onChange={(e) =>
            setData({ ...data, Employee_address: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Employee_date">Дата рождения</Label>
        <Input
          id="Employee_date"
          type="date"
          value={data.Employee_date}
          onChange={(e) => setData({ ...data, Employee_date: e.target.value })}
        />
      </FormGroup>
      <Button type="submit">Добавить</Button>
    </FormContainer>
  );
};

export default EmployeeForm;
