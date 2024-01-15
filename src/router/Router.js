import Contract from "../pages/Contracts/Contracts";
import ContractsEdit from "../pages/Contracts/ContractsEdit";
import Department from "../pages/Departments/Department";
import DepartmentEdit from "../pages/Departments/DepartmentEdit";
import Employees from "../pages/Employees/Employees";
import EmployeesEdit from "../pages/Employees/EmployeesEdit";
import Organization from "../pages/Organization/Organization";
import OrganizationEdit from "../pages/Organization/OrganizationEdit";
import Work from "../pages/Works/Works";
import WorkEdit from "../pages/Works/WorksEdit";
const publicRoutes = [
  { path: "/departments", component: Department, exac: true },
  { path: "/", component: Department, exac: true },
  { path: "/department/:id", component: DepartmentEdit, exac: true },
  { path: "/organization/:id", component: OrganizationEdit, exac: true },
  { path: "/organization", component: Organization, exac: true },
  { path: "/employee", component: Employees, exac: true },
  { path: "/employee/:id", component: EmployeesEdit, exac: true },
  { path: "/contract", component: Contract, exac: true },
  { path: "/contract/:id", component: ContractsEdit, exac: true },
  { path: "/work", component: Work, exac: true },
  { path: "/work/:id", component: WorkEdit, exac: true },
];
export default publicRoutes;
