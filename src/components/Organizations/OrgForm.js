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

const OrgForm = ({ create, dataAll }) => {
  const [data, setData] = useState({
    Organization_name: "",
    Organization_type: "",
    Organization_country: "",
    Organization_city: "",
    Organization_adress: "",
    Organization_fio: "",
  });

  async function OrgFetching(formData) {
    console.log(data);
    const response = await Requests.postOrganization(formData);
  }

  const AddOrg = (e) => {
    e.preventDefault();
    if (
      data.Organization_type &&
      data.Organization_name &&
      data.Organization_country &&
      data.Organization_city &&
      data.Organization_adress &&
      data.Organization_fio
    ) {
      OrgFetching(data);
      create(data);
    } else {
      alert("Заполните все поля");
    }
  };

  return (
    <FormContainer onSubmit={AddOrg}>
      <FormGroup>
        <Label htmlFor="Organization_name">Название организации</Label>
        <Input
          id="Organization_name"
          type="text"
          value={data.Organization_name}
          onChange={(e) =>
            setData({ ...data, Organization_name: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Organization_type">Тип организации</Label>
        <Input
          id="Organization_type"
          type="text"
          value={data.Organization_type}
          onChange={(e) =>
            setData({ ...data, Organization_type: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Organization_country">Страна</Label>
        <Input
          id="Organization_country"
          type="text"
          value={data.Organization_country}
          onChange={(e) =>
            setData({ ...data, Organization_country: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Organization_city">Город</Label>
        <Input
          id="Organization_city"
          type="text"
          value={data.Organization_city}
          onChange={(e) =>
            setData({ ...data, Organization_city: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Organization_adress">Адрес</Label>
        <Input
          id="Organization_adress"
          type="text"
          value={data.Organization_adress}
          onChange={(e) =>
            setData({ ...data, Organization_adress: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Organization_fio">Директор</Label>
        <Input
          id="Organization_fio"
          type="text"
          value={data.Organization_fio}
          onChange={(e) =>
            setData({ ...data, Organization_fio: e.target.value })
          }
        />
      </FormGroup>
      <Button type="submit">Добавить</Button>
    </FormContainer>
  );
};

export default OrgForm;
