import axios from "axios";
export default class Requests {
  static async getDepartments() {
    try {
      return await axios.get("http://127.0.0.1:5000/departments");
    } catch (e) {
      console.log(e);
    }
  }
  static async postDepartments(formData) {
    try {
      const responce = await axios.post(
        "http://127.0.0.1:5000/departments",
        formData
      );
      console.log(responce);
    } catch (e) {
      console.log(e);
    }
  }
  static async putDepartments(formData) {
    try {
      const responce = await axios.put(
        "http://127.0.0.1:5000/departments",
        formData
      );
    } catch (e) {
      console.log(e);
    }
  }
  static async deleteDepartments(deleteData) {
    try {
      return await axios.delete(
        `http://127.0.0.1:5000/departments?id=${deleteData}`
      );
    } catch (e) {
      console.log(e);
    }
  }

  static async getOrganization() {
    try {
      return await axios.get("http://127.0.0.1:5000/organizations");
    } catch (e) {
      console.log(e);
    }
  }
  static async postOrganization(formData) {
    try {
      console.log("");
      const responce = await axios.post(
        "http://127.0.0.1:5000/organizations",
        formData
      );
      console.log(responce);
    } catch (e) {
      console.log(e);
    }
  }
  static async deleteOrganization(deleteData) {
    try {
      return await axios.delete(
        `http://127.0.0.1:5000/organizations?id=${deleteData}`
      );
    } catch (e) {
      console.log(e);
    }
  }
  static async putOrganization(formData) {
    try {
      const responce = await axios.put(
        "http://127.0.0.1:5000/organizations",
        formData
      );
      return responce;
    } catch (e) {
      console.log(e);
    }
  }

  static async getEmployee() {
    try {
      return await axios.get("http://127.0.0.1:5000/employees");
    } catch (e) {
      console.log(e);
    }
  }
  static async postEmployee(formData) {
    try {
      console.log("");
      const responce = await axios.post(
        "http://127.0.0.1:5000/employees",
        formData
      );
      console.log(responce);
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteEmployee(deleteData) {
    try {
      return await axios.delete(
        `http://127.0.0.1:5000/employees?id=${deleteData}`
      );
    } catch (e) {
      console.log(e);
    }
  }
  static async putEmployee(formData) {
    try {
      const responce = await axios.put(
        "http://127.0.0.1:5000/employees",
        formData
      );
      console.log("HEHEHHE");
      return responce;
    } catch (e) {
      console.log(e);
    }
  }

  static async getContract() {
    try {
      return await axios.get("http://127.0.0.1:5000/contracts");
    } catch (e) {
      console.log(e);
    }
  }
  static async deleteContract(deleteData) {
    try {
      return await axios.delete(
        `http://127.0.0.1:5000/contracts?id=${deleteData}`
      );
    } catch (e) {
      console.log(e);
    }
  }
  static async postContract(formData) {
    try {
      const responce = await axios.post(
        "http://127.0.0.1:5000/contracts",
        formData
      );
      console.log(responce);
    } catch (e) {
      console.log(e);
    }
  }
  static async putContract(formData) {
    try {
      const responce = await axios.put(
        "http://127.0.0.1:5000/contracts",
        formData
      );
      return responce;
    } catch (e) {
      console.log(e);
    }
  }
  static async getWork() {
    try {
      return await axios.get("http://127.0.0.1:5000/works");
    } catch (e) {
      console.log(e);
    }
  }
  static async deleteWork(deleteData) {
    try {
      return await axios.delete(`http://127.0.0.1:5000/works?id=${deleteData}`);
    } catch (e) {
      console.log(e);
    }
  }
  static async postWork(formData) {
    try {
      const responce = await axios.post(
        "http://127.0.0.1:5000/works",
        formData
      );
      console.log(responce);
    } catch (e) {
      console.log(e);
    }
  }
  static async putWork(formData) {
    try {
      const responce = await axios.put("http://127.0.0.1:5000/works", formData);
      return responce;
    } catch (e) {
      console.log(e);
    }
  }
}
