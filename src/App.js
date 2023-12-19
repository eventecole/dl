import { useEffect, useState } from "react";
import logo from "./logo.svg";
import {
  Button,
  CircularProgress,
  CssBaseline,
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#FF671D", dark: "#FF671D", light: "#FF671D" },
  },
  typography: {
    fontFamily: '"Noto Sans KR","Roboto","Helvetica","Arial",sans-serif;',
  },
});
function Diag() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}dlsite.json`)
      .then((resp) => resp.json())
      .then((_d) => setData(_d ?? []))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <CircularProgress />
  ) : (
    <List sx={{ pl: 1, pr: 1 }}>
      {data.map(({ title, url }) => (
        <ListItemButton disableGutters dense LinkComponent={"a"} href={url}>
          <ListItemText primary={title} />
        </ListItemButton>
      ))}
    </List>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <div style={{ flex: 1 }} />
        <div style={{ width: "100%", overflow: "visible", margin: "32px 0" }}>
          <div
            style={{
              width: "100%",
              height: 60,
              backgroundImage: `url(${logo})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          />

          <div
            style={{
              marginTop: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">사전입주행사</Typography>
            <Typography variant="body2">통합시스템</Typography>
            <Button
              sx={{ borderRadius: 50, mt: 4, color: "#ffffff" }}
              variant="contained"
              onClick={() => setOpen(true)}
            >
              단지 선택
            </Button>
          </div>
        </div>
        <div style={{ flex: 1 }} />
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <Diag />
      </Dialog>
    </ThemeProvider>
  );
}

export default App;
