import { useEffect, useState } from "react";
import logo from "./logo.svg";
import {
  Button,
  CircularProgress,
  CssBaseline,
  Dialog,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
  dividerClasses,
  listClasses,
  listItemButtonClasses,
  paperClasses,
  styled,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#FF671D", dark: "#FF671D", light: "#FF671D" },
  },
  typography: {
    fontFamily: '"Noto Sans KR","Roboto","Helvetica","Arial",sans-serif;',
  },
});
const StyledDiag = styled(Dialog)(({ theme }) => ({
  [`& .${paperClasses.root}`]: {
    height: "calc(100% - 64px)",
    padding: theme.spacing(1),
    [`& > .${listClasses.root}`]: {
      padding: theme.spacing(0, 1),
      [`& .${dividerClasses.root}`]: {
        margin: theme.spacing(1, 0),
      },
      [`& > .${listItemButtonClasses.root}`]: {
        backgroundColor: grey[200],
        borderRadius: theme.spacing(1),
        padding: theme.spacing(1, 2),
        margin: theme.spacing(1, 0),
      },
    },
  },
}));
function Diag({ data, loading }) {
  // const [data, setData] = useState([]);
  const [searched, setSearched] = useState(undefined);

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const { keyword } = Object.fromEntries(new FormData(e.target));
    const _keyword = keyword.trim();
    if (_keyword === "") {
      setSearched(undefined);
    } else {
      setSearched(data.filter((i) => i.title.includes(_keyword)));
    }
  }

  return loading ? (
    <CircularProgress />
  ) : (
    <List sx={{ pl: 1, pr: 1 }}>
      <ListSubheader disableGutters>
        <Typography variant="h5">단지선택</Typography>
        <Divider />
      </ListSubheader>
      <ListItem disableGutters disablePadding>
        <Paper
          component="form"
          elevation={0}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            border: `1px solid ${grey[900]}`,
          }}
          onSubmit={handleSubmit}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="단지 검색"
            inputProps={{ "aria-label": "단지 검색" }}
            size="small"
            name="keyword"
          />
          <IconButton
            type="submit"
            sx={{ p: 0, color: "#FF671D" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </ListItem>
      {(searched ?? data).map(({ title, url }) => (
        <ListItemButton disableGutters LinkComponent={"a"} href={url}>
          <ListItemText primary={title} />
        </ListItemButton>
      ))}
    </List>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}dlsite.json?k=1`)
      .then((resp) => resp.json())
      .then((_d) => setData(_d ?? []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (Array.isArray(data) && data.length === 1)
      window.location.replace(data[0].url);
  }, [data]);

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
              disabled={loading}
            >
              {loading ? (
                <CircularProgress sx={{ height: 32, width: 32 }} />
              ) : (
                "단지 선택"
              )}
            </Button>
          </div>
        </div>
        <div style={{ flex: 1 }} />
      </Paper>
      <StyledDiag open={open} onClose={() => setOpen(false)} fullWidth>
        <Diag data={data} loading={loading} />
      </StyledDiag>
    </ThemeProvider>
  );
}

export default App;
