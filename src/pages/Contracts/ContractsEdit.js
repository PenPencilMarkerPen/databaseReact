import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
const ContractsEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    Kod_contract: "",
    Kod_organization: "",
    Contract_number: "",
    Contract_date: "",
    Contract_amount: "",
  });

  async function updateContract(formData) {
    const response = await Requests.putContract(formData);
    console.log(response);
  }

  //   useEffect(() => {
  //     async function fetchContract() {
  //       try {
  //         const response = await Requests.getContractById(id);
  //         const contractToEdit = response.data;
  //         setData({
  //           Kod_contract: contractToEdit.Kod_contract,
  //           Kod_organization: contractToEdit.Kod_organization,
  //           Contract_number: contractToEdit.Contract_number,
  //           Contract_date: contractToEdit.Contract_date,
  //           Contract_amount: contractToEdit.Contract_amount,
  //         });
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //     fetchContract();
  //   }, [id]);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await Requests.getContract();
        console.log(response);
        console.log(id);
        const contractToEdit = response.data.find(
          (con) => con.Kod_contract == id
        );
        console.log(contractToEdit);
        if (contractToEdit) {
          setData({
            Kod_contract: contractToEdit.Kod_contract,
            Kod_organization: contractToEdit.Kod_organization,
            Contract_number: contractToEdit.Contract_number,
            Contract_date: contractToEdit.Contract_date,
            Contract_amount: contractToEdit.Contract_amount,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchEmployee();
  }, [id]);

  const editContract = (e) => {
    e.preventDefault();
    if (
      data.Kod_contract &&
      data.Kod_organization &&
      data.Contract_number &&
      data.Contract_date &&
      data.Contract_amount
    ) {
      console.log(data);
      updateContract(data);
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
    <div>
      <BackButton to="/contract">Back</BackButton>
      <FormContainer onSubmit={editContract}>
        <FormGroup>
          <Label htmlFor="Kod_organization">Название организации</Label>
          <Select
            options={dataDepSelect}
            value={dataDepSelect.find(
              (option) => option.value == data.Kod_organization
            )}
            onChange={(selectedOption) =>
              setData({ ...data, Kod_department: selectedOption.value })
            }
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
            onChange={(e) =>
              setData({ ...data, Contract_date: e.target.value })
            }
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
        <Button type="submit">Редактировать</Button>
      </FormContainer>
    </div>
  );
};

export default ContractsEdit;
