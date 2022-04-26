import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { resetAlert } from "./../store/slices/alert";

export default function AlertSnackbar() {
    const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(resetAlert());
    }

    return (
        <Snackbar
            open={alert.message.length > 0}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            sx={{ boxShadow: 6 }}
        >
            <Box display="flex">
                <Alert
                    severity={alert.severity}
                    sx={{ width: "100%", alignItems: "center" }}
                >
                    {alert.message}
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Alert>
            </Box>
        </Snackbar>
    );
}