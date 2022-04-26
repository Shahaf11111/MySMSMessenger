import { List, ListItem } from "@mui/material";
import Message from "./Mesage";

export default function MessageList({ messages }) {
    return (
        <List sx={{ m: 1, maxHeight: 350, overflow: "auto" }}>
            {messages.map(({ id, to, dateCreated, text }) => (
                <ListItem key={id}>
                    <Message to={to} date={dateCreated} description={text} />
                </ListItem>
            ))}
        </List>
    );
}