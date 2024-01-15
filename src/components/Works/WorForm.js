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

const WorkForm = ({ create }) => {
  const [data, setData] = useState({
    Kod_work: "",
    Kod_contract: "",
    Kod_department: "",
    Work_start_date: "",
    Work_end_date: "",
  });

  async function WorkCreat(formData) {
    const response = await Requests.postWork(formData);
    console.log(response);
  }

  const AddContract = (e) => {
    e.preventDefault();
    console.log(data);
    if (data.Kod_department && data.Work_start_date && data.Work_end_date) {
      WorkCreat(data);
      create(data);
    } else {
      alert("Заполните все поля!");
    }
  };

  const [dataContractSelect, setDataContractSelect] = useState([]);
  const [dataOrgSelect, setDataOrgSelect] = useState([]);
  useEffect(() => {
    async function DepFetching() {
      try {
        const responceCntr = await Requests.getContract();
        const transformedDataContr = responceCntr.data.map((cntr) => ({
          value: cntr.Kod_contract,
          label: cntr.Contract_number,
        }));
        setDataContractSelect(transformedDataContr);
        const responceOrg = await Requests.getDepartments();
        const transformedDataOrg = responceOrg.data.map((org) => ({
          value: org.Kod_department,
          label: org.Department_name,
        }));
        setDataOrgSelect(transformedDataOrg);
      } catch (error) {
        console.error(error);
      }
    }
    DepFetching();
  }, []);
  console.log(dataContractSelect);
  console.log(dataOrgSelect);

  return (
    <FormContainer onSubmit={AddContract}>
      <FormGroup>
        <Label htmlFor="Kod_department">Код отдела</Label>
        <Select
          options={dataOrgSelect}
          onChange={(e) => setData({ ...data, Kod_department: e.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Kod_contract">Код договора</Label>
        <Select
          options={dataContractSelect}
          onChange={(e) => setData({ ...data, Kod_contract: e.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Work_start_date">Дата начала проектной работы</Label>
        <Input
          id="Work_start_date"
          type="date"
          value={data.Work_start_date}
          onChange={(e) =>
            setData({ ...data, Work_start_date: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Work_end_date">Дата окончания проектной работы</Label>
        <Input
          id="Work_end_date"
          type="date"
          value={data.Work_end_date}
          onChange={(e) => setData({ ...data, Work_end_date: e.target.value })}
        />
      </FormGroup>
      <Button type="submit">Добавить</Button>
    </FormContainer>
  );
};

export default WorkForm;
