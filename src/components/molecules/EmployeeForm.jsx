import { Box, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../atoms/Button";
import { formatCop } from "../../utils/number";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const schema = yup.object({
  nombre: yup.string().required("El nombre es obligatorio"),
  salario: yup.string().required("El salario es obligatorio"),
  fecha_ingreso: yup.date().required("La fecha de ingreso es obligatoria"),
});

const INITIAL_VALUES = {
  nombre: "",
  salario: "",
  fecha_ingreso: dayjs(new Date()),
};

export const EmployeeForm = ({
  values,
  isLoading,
  title = "Nuevo empleado",
  onCancel,
  onSubmit: submit,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    control,
  } = useForm({
    defaultValues: values ? values : INITIAL_VALUES,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    submit && submit(data);
  };

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
          label="Nombre"
          id="name"
          fullWidth
          autoFocus
          margin="normal"
          disabled={isLoading}
          error={errors.nombre !== undefined}
          helperText={errors.nombre ? errors.nombre.message : undefined}
          {...register("nombre")}
        />
        <TextField
          label="Salario"
          id="name"
          fullWidth
          autoFocus
          margin="normal"
          disabled={isLoading}
          error={errors.salario !== undefined}
          helperText={errors.salario ? errors.salario.message : undefined}
          {...register("salario")}
          onBlur={({ target }) => setValue("salario", formatCop(target.value))}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            control={control}
            name="fecha_ingreso"
            render={({ field }) => (
              <DatePicker
                name="fecha_ingreso"
                sx={{ width: "100%", mt: 1 }}
                maxDate={dayjs(new Date())}
                defaultValue={watch("fecha_ingreso")}
                value={field.value}
                onChange={(v) => field.onChange(v)}
              />
            )}
          />
        </LocalizationProvider>
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
