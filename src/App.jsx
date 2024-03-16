import { Divider, Typography } from "@mui/material";
import "./App.css";
import { MainLayout } from "./components/layouts/MainLayout";
import { Tabs } from "./components/molecules/Tabs";
import { Employee } from "./components/organism/Employee";
import { Request } from "./components/organism/Request";

function App() {
  const tabs = [
    {
      label: "Empleados",
      component: <Employee />,
    },
    {
      label: "Solicitudes",
      component: <Request />,
    },
  ];

  return (
    <MainLayout>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Gestión de empleados
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Tabs tabs={tabs} />
    </MainLayout>
  );
}

export default App;
