export interface UserData {
  name: string;
  email: string;
  status: string;
  telephone?: string;
  affiliation?: string;
}

const CUSTOMER_DATA: UserData[] = [
  {
    name: "Washington Junior",
    email: "washingtonj@company.com",
    telephone: "+55 11 981024667",
    status: "Active",
  },
  {
    name: "Roberto Major",
    email: "rmajor@company.com",
    telephone: "+55 21 981025667",
    status: "Blocked",
  },
];

const ADMINISTRATOR_DATA: UserData[] = [
  { name: "Luciano Yang", email: "lucianoyang@company.com", status: "Active" },
  { name: "Marcio Cabral", email: "marcio@company.com", status: "Active" },
  {
    name: "Leandra Amaral",
    email: "leandraamaral@company.com",
    status: "Active",
  },
];

const MANAGERS_DATA: UserData[] = [
  {
    name: "Roberval di Carvalho",
    email: "dicarvalho@company.com",
    affiliation: "Global",
    status: "Active",
  },
];


export const UserService = () => {
  function getCustomerData(): Promise<UserData[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(CUSTOMER_DATA), 500);
    });
  }
  
  function getAdministratorData(): Promise<UserData[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ADMINISTRATOR_DATA), 300);
    });
  }
  
  function getManagersData(): Promise<UserData[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MANAGERS_DATA), 800);
    });
  }

  return {
    getCustomerData,
    getAdministratorData,
    getManagersData,
  }
}