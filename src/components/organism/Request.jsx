import { DataGrid } from "../molecules/DataGrid";
import { useCallback, useMemo, useState } from "react";
import { formatDateWithHour } from "../../utils/date";
import { Modal } from "../atoms/Modal";
import { DataLayout } from "../layouts/DataLayout";
import { Box, IconButton, SvgIcon } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { getModifiedFields } from "../../utils/object";
import { useRequest } from "../../hooks/useRequest";
import { RequestForm } from "../molecules/RequestForm";

export const Request = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(null);

  const { data, isLoading, createRequest, updateRequest, deleteRequest } = useRequest({
    search,
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
  });

  const onSubmit = async (data) => {
    const form = {
      codigo: data.codigo,
      descripcion: data.descripcion,
      resumen: data.resumen,
      id_empleado: data.empleado.id
    };
    console.log({form})
    if (!request) await createRequest(form, { onSuccess: () => handleClose() });
    else {
      const modifiedValues = getModifiedFields(request, form);
      await updateRequest(
        { ...modifiedValues, id: request.id },
        {
          onSuccess: () => handleClose(),
        }
      );
    }
  };

  const handleEdit = (employee) => {
    setRequest(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRequest(null);
  };

  const handleDeleteRequest = useCallback(async (request) => {
    const result = confirm(`¿Estas seguro de eliminar la solicitud con código ${request.codigo}?`)
    if (result) await deleteRequest(request.id)
  }, [deleteRequest])

  const columns = useMemo(() => {
    return [
      {
        field: "codigo",
        headerName: "Código",
        flex: 1,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "empleado",
        headerName: "Empleado",
        valueFormatter: (params) => params.value.nombre,
        flex: 1,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "descripcion",
        headerName: "Descripción",
        flex: 1,
        sortable: false,
        disableColumnMenu: true,
      },
      {
        field: "resumen",
        headerName: "Resumen",
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
            <IconButton color="error" onClick={() => handleDeleteRequest(params.row)}>
              <SvgIcon>
                <Delete />
              </SvgIcon>
            </IconButton>
          </Box>
        ),
      },
    ];
  }, [handleDeleteRequest]);

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
        <RequestForm
          onSubmit={onSubmit}
          onCancel={handleClose}
          isLoading={isLoading}
          title={request ? 'Actualizar solicitud' : 'Nueva solicitud'}
          values={
            request
              ? {
                  codigo: request.codigo,
                  empleado: request.empleado,
                  descripcion: request.descripcion,
                  resumen: request.resumen,
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
