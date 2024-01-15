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

const ContractForm = ({ create }) => {
  const [data, setData] = useState({
    Kod_contract: "",
    Kod_organization: "",
    Contract_number: "",
    Contract_date: "",
    Contract_amount: "",
  });

  async function ContractCreation(formData) {
    const response = await Requests.postContract(formData);
  }

  const AddContract = (e) => {
    e.preventDefault();
    console.log(data);
    if (
      data.Kod_organization &&
      data.Contract_number &&
      data.Contract_date &&
      data.Contract_amount
    ) {
      ContractCreation(data);
      create(data);
    } else {
      alert("Заполните все поля!");
    }
  };

  const [dataDepSelect, setDataDepSelect] = useState([]);
  useEffect(() => {
    async function DepFetching() {
      try {
        const responce = await Requests.getOrganization();
        const transformedData = responce.data.map((dep) => ({
          value: dep.Kod_organization,
          label: dep.Organization_name,
        }));
        setDataDepSelect(transformedData);
      } catch (error) {
        console.error(error);
      }
    }
    DepFetching();
  }, []);
  console.log(dataDepSelect);

  return (
    <FormContainer onSubmit={AddContract}>
      <FormGroup>
        <Label htmlFor="Kod_organization">Название организации</Label>
        <Select
          options={dataDepSelect}
          onChange={(e) => setData({ ...data, Kod_organization: e.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Contract_number">Номер договора</Label>
        <Input
          id="Contract_number"
          type="text"
          value={data.Contract_number}
          onChange={(e) =>
            setData({ ...data, Contract_number: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Contract_date">Дата заключения договора</Label>
        <Input
          id="Contract_date"
          type="date"
          value={data.Contract_date}
          onChange={(e) => setData({ ...data, Contract_date: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Contract_amount">Стоимость договора</Label>
        <Input
          id="Contract_amount"
          type="text"
          value={data.Contract_amount}
          onChange={(e) =>
            setData({ ...data, Contract_amount: e.target.value })
          }
        />
      </FormGroup>
      <Button type="submit">Добавить</Button>
    </FormContainer>
  );
};

export default ContractForm;
