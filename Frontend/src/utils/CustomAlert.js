// import { Alert, Snackbar } from "@mui/material";
// import { useState } from "react";

// const CustomAlert = ({
//   open,
//   text,
//   snackSx,
//   anchor,
//   severity,
//   variant,
//   alertSx,
//   error,
//   setError,
//   alert,
//   setAlert,
// }) => {
//   const [bool, setBool] = useState(open || error || alert || false);
//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       setBool(false);
//       setAlert(false);
//       setError(false);
//       return;
//     }
//     setBool(false);
//     setAlert(false);
//     setError(false);
//   };

//   return (
//     <Snackbar
//       sx={snackSx}
//       open={bool}
//       autoHideDuration={6000}
//       onClose={handleClose}
//       anchorOrigin={anchor}
//     >
//       <Alert severity={severity} variant={variant || "outlined"} sx={alertSx}>
//         {text}
//       </Alert>
//     </Snackbar>
//   );
// };

// export default CustomAlert;
