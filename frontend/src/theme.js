import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#4F46E5",
        },
        secondary: {
            main: "#06B6D4",
        },
        background: {
            default: "#F4F7FB",
        },
    },

    typography: {
        fontFamily: "Poppins, sans-serif",
    },

    shape: {
        borderRadius: 12,
    },
});

export default theme;