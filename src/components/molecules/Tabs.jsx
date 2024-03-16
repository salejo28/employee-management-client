import { Box, Tab } from "@mui/material";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel"

export const Tabs = ({ tabs }) => {
  const [value, setValue] = useState('0');

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            {tabs.map((tab, idx) => (
              <Tab key={idx} label={tab.label} value={`${idx}`} />
            ))}
          </TabList>
        </Box>
        {tabs.map((tab, idx) => (
          <TabPanel key={idx} value={`${idx}`}>
            {tab.component}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};