import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../atoms/Button";
import { useEmployee } from "../../hooks/useEmployee";
import { useMemo, useState } from "react";

const schema = yup.object({
  codigo: yup.string().required("El código es obligatorio"),
  descripcion: yup.string().required("La descripcion es obligatorio"),
  resumen: yup.string().required("El resumen es obligatorio"),
  empleado: yup.object().required("El empleado es requerido"),
});

const INITIAL_VALUES = {
  codigo: "",
  resumen: "",
  descripcion: "",
  empleado: null,
};

export const RequestForm = ({
  values,
  isLoading,
  title = "Nueva solicitud",
  onCancel,
  onSubmit: submit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: values ? values : INITIAL_VALUES,
    resolver: yupResolver(schema),
  });
  const [search, setSearch] = useState("");

  const { data, isLoading: isLoadingSearch } = useEmployee({ search, page: 1, limit: 10 });

  const onSubmit = async (data) => {
    submit && submit(data);
  };

  const employees = useMemo(() => {
    return data?.docs ?? [];
  }, [data]);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <TextField
          label="Código"
          id="code"
          fullWidth
          autoFocus
          margin="normal"
          disabled={isLoading}
          error={errors.codigo !== undefined}
          helperText={errors.codigo ? errors.codigo.message : undefined}
          {...register("codigo")}
        />
        <TextField
          label="Descripción"
          id="code"
          fullWidth
          autoFocus
          margin="normal"
          disabled={isLoading}
          error={errors.descripcion !== undefined}
          helperText={
            errors.descripcion ? errors.descripcion.message : undefined
          }
          {...register("descripcion")}
        />
        <TextField
          label="Resumen"
          id="resume"
          fullWidth
          autoFocus
          margin="normal"
          disabled={isLoading}
          error={errors.resumen !== undefined}
          helperText={errors.resumen ? errors.resumen.message : undefined}
          {...register("resumen")}
        />

        <Controller
          control={control}
          name="empleado"
          render={({ field }) => (
            <Autocomplete
              name="empleado"
              fullWidth
              value={field.value}
              disablePortal
              options={employees}
              disabled={isLoading}
              loading={isLoadingSearch}
              getOptionLabel={(opt) => opt.nombre}
              onChange={(_, v) => field.onChange(v)}
              onInputChange={(_, v) => setSearch(v)}
              inputValue={search}
              isOptionEqualToValue={(opt, v) => opt.id === v?.id}
              renderInput={(params) => (
                <TextField {...params} label="Empleado" margin="normal" />
              )}
            />
          )}
        />
        <Box sx={{ display: "flex", gap: 1, mt: 2, justifyContent: "right" }}>
          <Button
            type="button"
            onClick={onCancel}
            variant="outlined"
            color="error"
          >
            Cancelar
          </Button>
          <Button type="submit" variant="contained" loading={isLoading}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
