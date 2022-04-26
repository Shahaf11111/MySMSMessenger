import * as React from "react";
import { Typography, Stack, Box, TextField } from "@mui/material";

const MAX_MESSAGE_LENGTH = 250;

export default function Message({ to, date, description }) {

    return (
        <Stack spacing={1} width="100%" m={4}>
            <Box display="flex" justifyContent="space-between">
                <Typography textAlign="left" fontWeight="bold">{to}</Typography>
                <Typography textAlign="right">{date}</Typography>
            </Box>
            <TextField
                multiline
                rows={description.split("\n").length}
                fullWidth
                value={description}
                disabled
            />
            <Typography textAlign="right">{description.length}/{MAX_MESSAGE_LENGTH}</Typography>
        </Stack>
    );
}