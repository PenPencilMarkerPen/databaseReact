import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Requests from "../../components/API/RequestsDB";
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

const BackButton = styled(Link)`
  display: inline-block;
  padding: 8px 12px;
  margin-bottom: 20px;
  background-color: #555;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const EmployeesEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    Kod_department: "",
    Employee_fio: "",
    Employee_post: "",
    Employee_number: "",
    Employee_gender: "",
    Employee_address: "",
    Employee_date: "",
  });

  async function updateEmployee(formData) {
    console.log(formData);
    console.log("formData");
    const response = await Requests.putEmployee(formData);
  }

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

  const [departmentOptions, setDepartmentOptions] = useState([]);

  const editEmployee = (e) => {
    e.preventDefault();
    if (
      data.Employee_fio &&
      data.Employee_post &&
      data.Employee_number &&
      data.Employee_gender &&
      data.Employee_address &&
      data.Employee_date &&
      data.Kod_department
    ) {
      updateEmployee(data);
    } else {
      alert("Please fill in all fields.");
    }
  };

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await Requests.getDepartments();
        const transformedData = response.data.map((dep) => ({
          value: dep.Kod_department,
          label: dep.Department_name,
        }));
        setDepartmentOptions(transformedData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDepartments();
  }, []);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await Requests.getEmployee();
        console.log(response);
        console.log(id);
        const employeeToEdit = response.data.find(
          (emp) => emp.Kod_employee == id
        );
        console.log(employeeToEdit);
        if (employeeToEdit) {
          setData({
            Kod_department: employeeToEdit.Kod_department,
            Kod_employee: employeeToEdit.Kod_employee,
            Employee_fio: employeeToEdit.Employee_fio,
            Employee_post: employeeToEdit.Employee_post,
            Employee_number: employeeToEdit.Employee_number,
            Employee_gender: employeeToEdit.Employee_gender,
            Employee_address: employeeToEdit.Employee_address,
            Employee_date: employeeToEdit.Employee_date,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchEmployee();
  }, [id]);

  return (
    <div>
      <BackButton to="/employee">Назад</BackButton>
      <FormContainer onSubmit={editEmployee}>
        <FormGroup>
          <Label htmlFor="Kod_department">Код отдела</Label>
          <Select
            options={dataDepSelect}
            value={dataDepSelect.find(
              (option) => option.value == data.Kod_department
            )}
            onChange={(selectedOption) =>
              setData({ ...data, Kod_department: selectedOption.value })
            }
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
            onChange={(e) =>
              setData({ ...data, Employee_post: e.target.value })
            }
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
            onChange={(e) =>
              setData({ ...data, Employee_date: e.target.value })
            }
          />
        </FormGroup>
        <Button type="submit">Редактировать</Button>
      </FormContainer>
    </div>
  );
};

export default EmployeesEdit;
