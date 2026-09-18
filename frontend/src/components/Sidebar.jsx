import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Divider,
    Box
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 260;

function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            text: "Dashboard",
            icon: <DashboardIcon />,
            path: "/dashboard",
        },
        {
            text: "Generate Email",
            icon: <AutoAwesomeIcon />,
            path: "/generate",
        },
        {
            text: "Email History",
            icon: <HistoryIcon />,
            path: "/history",
        },
        {
            text: "Profile",
            icon: <PersonIcon />,
            path: "/profile",
        },
    ];

    const logout = () => {

        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) {
            return;
        }

        localStorage.removeItem("token");

        navigate("/", { replace: true });

    };

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    background: "#1E293B",
                    color: "#fff",
                },
            }}
        >

            <Toolbar>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                >

                    AI Email Composer

                </Typography>

            </Toolbar>

            <Divider
                sx={{
                    background: "#334155",
                }}
            />

            <List>

                {menuItems.map((item) => (

                    <ListItemButton
                        key={item.text}
                        selected={location.pathname === item.path}
                        onClick={() => navigate(item.path)}
                        sx={{
                            mx: 1,
                            mt: 1,
                            borderRadius: 2,

                            "&.Mui-selected": {
                                background: "#4F46E5",
                            },

                            "&:hover": {
                                background: "#374151",
                            },
                        }}
                    >

                        <ListItemIcon
                            sx={{
                                color: "#fff",
                            }}
                        >

                            {item.icon}

                        </ListItemIcon>

                        <ListItemText
                            primary={item.text}
                        />

                    </ListItemButton>

                ))}

            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Divider
                sx={{
                    background: "#334155",
                }}
            />

            <List>

                <ListItemButton
                    onClick={logout}
                    sx={{
                        mx: 1,
                        my: 1,
                        borderRadius: 2,

                        "&:hover": {
                            background: "#EF4444",
                        },
                    }}
                >

                    <ListItemIcon
                        sx={{
                            color: "#fff",
                        }}
                    >

                        <LogoutIcon />

                    </ListItemIcon>

                    <ListItemText
                        primary="Logout"
                    />

                </ListItemButton>

            </List>

        </Drawer>

    );

}

export default Sidebar;