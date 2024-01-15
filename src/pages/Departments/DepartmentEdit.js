import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Requests from "../../components/API/RequestsDB";
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

const DepartmentEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    Kod_department: "",
    Department_name: "",
    Department_floor: "",
    Department_phone: "",
    Department_fio: "",
  });

  async function DepFetchingPut(formData) {
    const responce = await Requests.putDepartments(formData);
  }

  const [dataAll, setDataAll] = useState([]);

  const AddDep = (e) => {
    e.preventDefault();
    if (
      data.Department_name &&
      data.Department_floor &&
      data.Department_phone &&
      data.Department_fio
    ) {
      console.log(data);
      DepFetchingPut(data);
    } else {
      alert("Заполните все поля");
    }
  };

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

  useEffect(() => {
    const editDep = dataAll.find((item) => item.Kod_department == id);
    console.log(editDep);
    if (editDep) {
      setData({
        Kod_department: editDep.Kod_department,
        Department_name: editDep.Department_name,
        Department_floor: editDep.Department_floor,
        Department_phone: editDep.Department_phone,
        Department_fio: editDep.Department_fio,
      });
    }
  }, [dataAll, id]);

  return (
    <div>
      <BackButton to="/departments">Назад</BackButton>
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
            onChange={(e) =>
              setData({ ...data, Department_fio: e.target.value })
            }
          />
        </FormGroup>
        <Button type="submit">Редактировать</Button>
      </FormContainer>
    </div>
  );
};

export default DepartmentEdit;
