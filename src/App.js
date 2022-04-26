import { Box, Typography } from "@mui/material";
import NewMessage from "./components/NewMessage";
import MessageHistory from "./components/MessageHistory";
import AlertSnackbar from "./components/AlertSnackbar";
import './App.css';

function App() {
  return (
    <div className="App">
      <AlertSnackbar />
      <Typography variant="h4" fontWeight="bold">MY SMS MESSENGER</Typography>
      <Box display="flex">
        <NewMessage />
        <MessageHistory />
      </Box>
    </div>
  );
}

export default App;
