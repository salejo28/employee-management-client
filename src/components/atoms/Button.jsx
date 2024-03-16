import {
  Button as ButtonMui,
  CircularProgress,
} from "@mui/material";

export const Button = ({ loading, ...props }) => {
  if (loading)
    return (
      <ButtonMui disabled={loading} {...props}>
        <CircularProgress size={25} />
      </ButtonMui>
    );
  return <ButtonMui {...props} />;
}