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
  MergeCellsOutlined,
  InboxOutlined,
  ShopOutlined,
} from "@ant-design/icons";

// Constant: Icons Mapping
const icons = {
  DashboardIcon: DashboardOutlined,
  ManagementIcon: UsergroupAddOutlined,
  MergeIcon: MergeCellsOutlined,
  MovementIcon: InboxOutlined,
  UserIcon: UserOutlined,
  FinanceIcon: BankOutlined,
  LogoutIcon: LogoutOutlined,
  RegisterIcon: PlusCircleOutlined,
  ManagementMainIcon: AppstoreOutlined,
  MedicalIcon: HeartOutlined,
  TreatmentIcon: ExperimentOutlined,
  PharmacyIcon: MedicineBoxOutlined,
  ReportIcon: FileTextOutlined,
  DepartmentIcon: ShopOutlined,
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "item",
  url: "/dashboard",
  icon: icons.DashboardIcon,
  breadcrumbs: false,
};

// Management Section
const management = {
  id: "managementPage",
  title: "Management",
  icon: icons.ManagementIcon,
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
      id: "merge-patients",
      title: "Merge Patients",
      type: "item",
      url: "/management/patients/merge",
      icon: icons.MergeIcon,
      breadcrumbs: false,
    },
    {
      id: "patient-movement",
      title: "Patient Movement",
      type: "item",
      url: "/management/patients/movement",
      icon: icons.MovementIcon,
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
};

// Medical Process Section
const medicalProcess = {
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
};

// Pharmacy Section
const pharmacy = {
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
};

// Finance Section
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

// Hospital Management Section
const hospitalManagement = {
  id: "hospital-management2",
  title: "Hospital Management",
  type: "collapse",
  icon: icons.ManagementMainIcon,
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
};

// Reports Section
const reports = {
  id: "users",
  title: "Users",
  type: "item",
  url: "/users",
  icon: icons.UserIcon,
};

const menuItems = {
  items: [
    dashboard,
    management,
    medicalProcess,
    pharmacy,
    hospitalManagement,
    finance,
    reports,
  ],
};

export default menuItems;
