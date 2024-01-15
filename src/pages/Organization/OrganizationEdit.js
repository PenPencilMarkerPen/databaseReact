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

const OrganizationEdit = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    Organization_type: "",
    Organization_name: "",
    Organization_country: "",
    Organization_city: "",
    Organization_adress: "",
    Organization_fio: "",
  });

  async function OrgFetchingPut(formData) {
    const responce = await Requests.putOrganization(formData);
  }

  const [dataAll, setDataAll] = useState([]);

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
      console.log(data);
      OrgFetchingPut(data);
    } else {
      alert("Заполните все поля");
    }
  };

  useEffect(() => {
    async function OrgFetching() {
      try {
        const responce = await Requests.getOrganization();
        setDataAll(responce.data);
      } catch (error) {
        console.error(error);
      }
    }
    OrgFetching();
  }, []);

  useEffect(() => {
    const editOrg = dataAll.find((item) => item.Kod_organization == id);
    console.log(editOrg);
    if (editOrg) {
      setData({
        Kod_organization: editOrg.Kod_organization,
        Organization_name: editOrg.Organization_name,
        Organization_type: editOrg.Organization_type,
        Organization_country: editOrg.Organization_country,
        Organization_city: editOrg.Organization_city,
        Organization_adress: editOrg.Organization_adress,
        Organization_fio: editOrg.Organization_fio,
      });
    }
  }, [dataAll, id]);

  return (
    <div>
      <BackButton to="/organization">Назад</BackButton>
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
        <Button type="submit">Редактировать</Button>
      </FormContainer>
    </div>
  );
};

export default OrganizationEdit;
