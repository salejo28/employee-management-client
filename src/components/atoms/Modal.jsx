import { Modal as ModalUi, Backdrop, Fade, Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 450,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
  outline: "none",
};

export const Modal = ({ children, ...props }) => {
  return (
    <ModalUi
      {...props}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      keepMounted={false}
    >
      <Fade in={props.open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </ModalUi>
  );
};
