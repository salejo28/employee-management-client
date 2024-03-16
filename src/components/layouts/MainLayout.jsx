import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Toaster } from "sonner";

export const MainLayout = ({ children }) => {
  return (
    <ThemeProvider theme={{}}>
      <CssBaseline />
      <Toaster richColors />
      <Box sx={{ p: 5 }}>{children}</Box>
    </ThemeProvider>
  );
};
