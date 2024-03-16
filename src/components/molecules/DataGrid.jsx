import { Box, styled } from "@mui/material";
import {
  DataGrid as DataGridMui,
} from "@mui/x-data-grid";

const StyledDataGrid = styled(DataGridMui)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === "light"
      ? "rgba(0,0,0,.85)"
      : "rgba(255,255,255,0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-cell": {
    color:
      theme.palette.mode === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.65)",
  },
  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
}));

export const DataGrid = (props) => {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <StyledDataGrid
        {...props}
        localeText={{
          noRowsLabel: "No hay datos",
          MuiTablePagination: {
            labelRowsPerPage: "Filas por página",
            labelDisplayedRows: (params) =>
              `${params.to} de ${params.count}`,
          },
        }}
        initialState={{
          pagination: {
            paginationModel: props.paginationModel
              ? props.paginationModel
              : {
                  pageSize: 5,
                  page: 1,
                },
          },
        }}
        rowSelection={false}
        pagination
        pageSizeOptions={[5, 10, 15]}
      />
    </Box>
  );
};