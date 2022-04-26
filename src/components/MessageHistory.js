import { Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import MessageList from "./MessageList";

export default function MessageHistory() {
    const sentMessages = useSelector((state) => state.messages.sent);

    return (
        <Paper sx={{ width: "100%", m: 1 }}>
            <Typography mt={2} mb={2} variant="h6" fontWeight="bold">
                Message History ({sentMessages.length})
            </Typography>
            <MessageList messages={sentMessages} />
        </Paper >
    );
}