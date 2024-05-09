import { ChakraProvider, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { UserTable } from 'components'

const AVAILABLE_TABLES = [
  { title: "Customer", id: "customer" },
  { title: "Administrator", id: "administrator" },
  { title: "Manager", id: "manager" },
];

export default function App() {
  return (
    <ChakraProvider>
      <Tabs>
        <TabList>
          {AVAILABLE_TABLES.map((table) => (
            <Tab key={table.title}>{table.title}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {AVAILABLE_TABLES.map((table) => (
            <TabPanel key={table.title}>
               <UserTable key={table.id} id={table.id as any} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
}
