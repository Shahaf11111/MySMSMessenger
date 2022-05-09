import * as React from "react";
import { Typography, Box, TextField, Button, Paper, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { sendMessage } from "../store/slices/messages";
import clientApi from "../api";
import { error } from "../store/slices/alert";

const MAX_MESSAGE_LENGTH = 250;

export default function NewMessage() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [text, setText] = React.useState("");
    const dispatch = useDispatch();

    const handlePhoneNumberChange = (event) => {
        const newPhoneNumber = event.target.value;
        setPhoneNumber(newPhoneNumber);
    }

    const handleTextChange = (event) => {
        const newText = event.target.value;
        setText(newText);
    }

    const handleFormReset = () => {
        setPhoneNumber("");
        setText("");
    }

    const handleSendMessage = async () => {
        try {
            setIsSubmitting(true);
            const sentMessage = await clientApi.sendMessage("16465863849", phoneNumber, text);
            dispatch(sendMessage(sentMessage));
        } catch (err) {
            dispatch(error(err.message));
        }
        setIsSubmitting(false);
    }

    return (
        <Paper sx={{ width: "100%", m: 1 }}>
            <Typography mt={2} variant="h6" fontWeight="bold" alignSelf="start">
                New Message
            </Typography>
            <Box m={2}>
                <Typography mb={1} textAlign="left">Phone Number</Typography>
                <TextField
                    fullWidth
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
            </Box>
            <Box m={2}>
                <Typography mb={1} textAlign="left">Message</Typography>
                <TextField
                    multiline
                    rows={4}
                    fullWidth
                    value={text}
                    onChange={handleTextChange}
                />
                <Typography textAlign="right">{text.length}/{MAX_MESSAGE_LENGTH}</Typography>
            </Box>
            <Box m={2} display="flex" flexGrow={1}>
                <Button variant="text" sx={{ color: "Black", textTransform: "none" }}
                    onClick={handleFormReset}
                >
                    Clear
                </Button>
                <Box sx={{ width: "100%", flexGrow: "1 1 auto" }} />
                <Button
                    variant="contained"
                    sx={{ minWidth: 100, textTransform: "none", borderRadius: 8 }}
                    onClick={handleSendMessage}
                    startIcon={isSubmitting && <CircularProgress sx={{ color: "white" }} size={20} />}
                >
                    Submit
                </Button>
            </Box>
        </Paper>
    );
}