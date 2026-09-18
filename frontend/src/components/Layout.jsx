import { Box, Toolbar } from "@mui/material";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import api from "../services/api";

import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import NotificationsIcon from "@mui/icons-material/Notifications";
function Layout({ children }) {

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Navbar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "#F4F7FB",
                    minHeight: "100vh",
                    p: 4,
                }}
            >

                <Toolbar />

                {children}

            </Box>

        </Box>

    );

}

export default Layout;