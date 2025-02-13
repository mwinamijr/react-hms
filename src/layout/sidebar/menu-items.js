import {
  DashboardOutlined,
  UserOutlined,
  BankOutlined,
  LogoutOutlined,
  PlusCircleOutlined,
  AppstoreOutlined,
  HeartOutlined,
  ExperimentOutlined,
  MedicineBoxOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  Merge,
  MoveToInboxOutlined,
  BusinessCenter,
} from "@mui/icons-material";
import logout from "../../store/user/userSlice";
import { useDispatch } from "react-redux";

// constant
const icons = {
  DashboardIcon: DashboardOutlined,
  Management: UsergroupAddOutlined,
  Merge: Merge,
  Movement: MoveToInboxOutlined,
  UserIcon: UserOutlined,
  FinanceIcon: BankOutlined,
  LogoutIcon: LogoutOutlined,
  RegisterIcon: PlusCircleOutlined,
  ManagementIcon: AppstoreOutlined,
  MedicalIcon: HeartOutlined,
  TreatmentIcon: ExperimentOutlined,
  PharmacyIcon: MedicineBoxOutlined,
  ReportIcon: FileTextOutlined,
  DepartmentIcon: BusinessCenter,
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      icon: icons.DashboardIcon,
      breadcrumbs: false,
    },
  ],
};
const management = {
  id: "management",
  type: "group",
  children: [
    {
      id: "managementPage",
      title: "Management",
      icon: icons.Management,
      type: "collapse",
      children: [
        {
          id: "patients",
          title: "Patients",
          type: "item",
          url: "/management/patients",
          icon: icons.UserIcon,
          breadcrumbs: true,
        },
        {
          id: "merge patients",
          title: "Merge Patients",
          type: "item",
          url: "/management/patients/merge",
          icon: icons.Merge,
          breadcrumbs: false,
        },
        {
          id: "patient movement",
          title: "Patient Movement",
          type: "item",
          url: "/management/patients/movement",
          icon: icons.Movement,
          breadcrumbs: false,
        },
        {
          id: "visit",
          title: "Assign Visit",
          type: "item",
          url: "/management/patients/visits",
          icon: icons.RegisterIcon,
        },
        {
          id: "department",
          title: "Department",
          type: "item",
          url: "/management/departments",
          icon: icons.DepartmentIcon,
        },
      ],
    },
  ],
};

const medicalProcess = {
  id: "medical-process",
  type: "group",
  children: [
    {
      id: "medical",
      title: "Medical Process",
      type: "collapse",
      icon: icons.MedicalIcon,
      children: [
        { id: "vitals", title: "Vitals", type: "item", url: "/medical/vitals" },
        {
          id: "doctor",
          title: "Doctor Assignment",
          type: "item",
          url: "/medical/doctor",
        },
        {
          id: "history",
          title: "Medical History",
          type: "item",
          url: "/medical/history",
        },
        {
          id: "tests",
          title: "Tests & Results",
          type: "item",
          url: "/medical/tests",
        },
        {
          id: "treatment",
          title: "Treatments",
          type: "item",
          url: "/medical/treatment",
          icon: icons.TreatmentIcon,
        },
      ],
    },
  ],
};

const pharmacy = {
  id: "pharmacy",
  type: "group",
  children: [
    {
      id: "pharmacy",
      title: "Pharmacy",
      type: "collapse",
      icon: icons.PharmacyIcon,
      children: [
        {
          id: "prescriptions",
          title: "Prescriptions",
          type: "item",
          url: "/pharmacy/prescriptions",
        },
        {
          id: "dispense",
          title: "Dispense Medicine",
          type: "item",
          url: "/pharmacy/dispense",
        },
      ],
    },
  ],
};

const finance = {
  id: "finance",
  type: "group",
  children: [
    {
      id: "payments",
      title: "Payments",
      type: "item",
      url: "/finance/payments",
      icon: icons.FinanceIcon,
      breadcrumbs: false,
    },
    {
      id: "insurance",
      title: "Insurance Claims",
      type: "item",
      url: "/finance/insurance",
    },
  ],
};

const hospitalManagement = {
  id: "hospital management",
  type: "group",
  children: [
    {
      id: "hospital management",
      title: "Hospital Management",
      type: "collapse",
      icon: icons.PharmacyIcon,
      children: [
        {
          id: "insurance-companies",
          title: "Insurance Companies",
          type: "item",
          url: "/management/insurance-companies",
        },
        {
          id: "insured-patients",
          title: "Insured Patients",
          type: "item",
          url: "/management/insurance",
        },
        {
          id: "hospital-items",
          title: "Hospital Items",
          type: "item",
          url: "/management/hospital-items",
        },
        {
          id: "item-types",
          title: "Item Types",
          type: "item",
          url: "/management/item-types",
        },
      ],
    },
  ],
};

const reports = {
  id: "users",
  type: "group",
  children: [
    {
      id: "users",
      title: "Users",
      type: "item",
      url: "/users",
      icon: icons.UserIcon,
    },
  ],
};

const dispatch = useDispatch;

const handleLogout = async () => {
  dispatch(logout());
};

const signout = {
  id: "signout",
  type: "group",
  children: [
    {
      id: "signout",
      title: "Logout",
      type: "item",
      onClick: handleLogout,
      icon: icons.LogoutIcon,
    },
  ],
};

// ==============================|| MENU ITEMS ||============================== //
const menuItems = {
  items: [
    dashboard,
    management,
    medicalProcess,
    pharmacy,
    hospitalManagement,
    finance,
    reports,
    signout,
  ],
};

export default menuItems;
