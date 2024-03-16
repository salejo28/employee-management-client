import { DataGrid } from "../molecules/DataGrid";
import { useCallback, useMemo, useState } from "react";
import { formatCop, unFormatPrice } from "../../utils/number";
import { formatDate, formatDateWithHour } from "../../utils/date";
import { useEmployee } from "../../hooks/useEmployee";
import { Modal } from "../atoms/Modal";
import { DataLayout } from "../layouts/DataLayout";
import { EmployeeForm } from "../molecules/EmployeeForm";
import { Box, IconButton, SvgIcon } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import dayjs from "dayjs";
import { getModifiedFields } from "../../utils/object";

export const Employee = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState(null);

  const { data, isLoading, createEmployee, updateEmployee, deleteEmployee } =
    useEmployee({
      search,
      page: paginationModel.page + 1,
      limit: paginationModel.pageSize,
    });

  const onSubmit = async (data) => {
    const form = {
      ...data,
      salario: unFormatPrice(data.salario),
    };
    if (!employee)
      await createEmployee(form, { onSuccess: () => handleClose() });
    else {
      const modifiedValues = getModifiedFields(employee, form);
      await updateEmployee(
        { ...modifiedValues, id: employee.id },
        {
          onSuccess: () => handleClose(),
        }
      );
    }
  };

  const handleEdit = (employee) => {
    setEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmployee(null);
  };

  const handleDeleteEmployee = useCallback(
    async (employee) => {
      const result = confirm(
        `¿Estás seguro de eliminar al empleado ${employee.nombre}?`
      );
      if (result) {
        await deleteEmployee(employee.id);
      }
    },
    [deleteEmployee]
  );

  const columns = useMemo(() => {
    return [
      {
        field: "nombre",
        headerName: "Nombre",
        flex: 1,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "salario",
        headerName: "Salario",
        valueFormatter: (params) => formatCop(params.value),
        flex: 1,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "fecha_ingreso",
        headerName: "Fecha de ingreso",
        valueFormatter: (params) => formatDate(params.value),
        flex: 1,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "fecha_creacion",
        headerName: "Fecha de creación",
        flex: 1,
        valueFormatter: (params) => formatDateWithHour(params.value),
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "fecha_actualizacion",
        headerName: "Fecha de actualización",
        flex: 1,
        valueFormatter: (params) => formatDateWithHour(params.value),
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "id",
        headerName: "Acciones",
        flex: 1,
        renderCell: (params) => (
          <Box sx={{ display: "flex" }}>
            <IconButton color="info" onClick={() => handleEdit(params.row)}>
              <SvgIcon>
                <Edit />
              </SvgIcon>
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDeleteEmployee(params.row)}
            >
              <SvgIcon>
                <Delete />
              </SvgIcon>
            </IconButton>
          </Box>
        ),
      },
    ];
  }, [handleDeleteEmployee]);

  const rows = useMemo(() => {
    return data?.docs ?? [];
  }, [data]);

  const rowCount = useMemo(() => {
    return +(data?.total ?? 0);
  }, [data]);

  return (
    <DataLayout
      handleCreate={() => setOpen(true)}
      search={search}
      onChangeSearch={(v) => setSearch(v)}
    >
      <Modal open={open} onClose={handleClose}>
        <EmployeeForm
          onSubmit={onSubmit}
          onCancel={handleClose}
          title={employee ? 'Actualizar empleado' : 'Nuevo empleado'}
          isLoading={isLoading}
          values={
            employee
              ? {
                  nombre: employee.nombre,
                  salario: employee.salario,
                  fecha_ingreso: dayjs(employee.fecha_ingreso),
                }
              : undefined
          }
        />
      </Modal>
      <DataGrid
        loading={isLoading}
        columns={columns}
        rows={rows}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        getRowId={(row) => row.id}
        rowCount={rowCount}
      />
    </DataLayout>
  );
};
