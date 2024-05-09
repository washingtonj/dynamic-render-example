import { TabPanel, Select, TableContainer, Table, Thead, Tr, Th, Spinner, Tbody, Td, Box, Input } from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import { UserData, UserService } from 'services'

type AvailableTables = 'customer' | 'administrator' | 'manager'

interface TableParams {
  id: AvailableTables;
  columns: string[];
  resources?: ("Filter")[];
}


const AVAILABLE_TABLES: TableParams[] = [
  {
    id: "customer",
    columns: ["Name", "Email", "Telephone", "Status"],
    resources: ["Filter"],
  },
  {
    id: "administrator",
    columns: ["Name", "Email", "Status"],
  },
  {
    id: "manager",
    columns: ["Name", "Email", "Affiliation", "Status"],
  },
];

interface DataState {
  data: UserData[];
  isLoading: boolean;
}

interface UserTableProps {
  id: AvailableTables;
}

export default function UserTable(props: UserTableProps) {
  const { columns, resources } = AVAILABLE_TABLES.find((table) => table.id === props.id)!;

  const [dataState, setDataState] = useState<DataState>({
    data: [],
    isLoading: false,
  });

  const [search, setSearch] = useState<string>("");

  const filteredData = useMemo(() => {
    return dataState.data.filter((dataItem) =>
      Object.values(dataItem).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(search.toLowerCase());
        }
        return false;
      })
    );
  }, [dataState.data, search]);


  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }


  async function loadData() {
    setDataState((prevState) => ({ ...prevState, isLoading: true }));

    const service = UserService();

    const data = {
      customer: await service.getCustomerData(),
      administrator: await service.getAdministratorData(),
      manager: await service.getManagersData(),
    }[props.id]

    setDataState({ data, isLoading: false });
  }

  useEffect(() => {
    loadData();
  }, []);


  return (
    <>
      {dataState.isLoading && (
        <Box display='flex' justifyContent='center' alignItems='center' height='50vh'>
          <Spinner />
        </Box>
      )}


      {!dataState.isLoading && (
        <>
          <Box display='flex' gap='2' mb='8'>

            {resources?.includes("Filter") && (
              <Select width={'300px'} placeholder="Filter by City">
                <option value="option1">Sao Paulo</option>
                <option value="option2">Bahia</option>
                <option value="option3">Rio de Janeiro</option>
              </Select>
            )}

            <Input placeholder="Search by name or email" onChange={handleSearch} />
          </Box>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {columns.map((columnTitle) => (
                    <Th key={columnTitle}>{columnTitle}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.map((dataItem) => (
                  <Tr key={dataItem.email as string}>
                    {Object.values(dataItem).map((value) => (
                      <Td key={value}>{value}</Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer></>
      )}
    </>
  );
}

