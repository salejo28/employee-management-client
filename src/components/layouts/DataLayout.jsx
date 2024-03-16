import { Add, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  SvgIcon,
  TextField,
} from "@mui/material";

export const DataLayout = ({
  search,
  onChangeSearch,
  handleCreate,
  children,
}) => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ boxShadow: 1, mb: 3.5, borderRadius: 1, padding: 2 }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          value={search}
          onChange={({ target }) =>
            onChangeSearch && onChangeSearch(target.value)
          }
          label="Buscar"
          sx={{ width: 400 }}
        />
      </Box>
      {children}
      <IconButton
        sx={{
          position: "absolute",
          right: 25,
          bottom: 30,
          bgcolor: "secondary.main",
        }}
        onClick={() => handleCreate && handleCreate()}
        disableFocusRipple
        disableRipple
        disableTouchRipple
      >
        <SvgIcon fontSize="medium">
          <Add sx={{ color: "#fff" }} />
        </SvgIcon>
      </IconButton>
    </Box>
  );
};
