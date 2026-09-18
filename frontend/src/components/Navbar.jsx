import {
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    IconButton,
    Badge,
    Box,
    Menu,
    MenuItem
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../services/api";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Navbar() {
    const [notifications, setNotifications] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);

    const [notificationCount, setNotificationCount] = useState(0);

    const [user, setUser] = useState({
        name: "",
        email: ""
    });

    const loadNotifications = async () => {

        try {

            const response = await api.get("/notifications");

            setNotifications(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadNotificationCount = async () => {

        try {

            const response = await api.get("/notifications/count");

            setNotificationCount(response.data.count);

        } catch (error) {

            console.log(error);

        }

    };

    const loadUser = async () => {

        try {

            const response = await api.get("/users/me");

            console.log(response.data);

            setUser(response.data);

        } catch (error) {

            console.log(error);

        }

    };
    const markAsRead = async () => {

        try {

            await api.put("/notifications/read");

            loadNotifications();
            loadNotificationCount();

        } catch (error) {

            console.log(error);

        }

    };
    const clearNotifications = async () => {

        try {

            await api.delete("/notifications/clear");

            setNotifications([]);

            setNotificationCount(0);

            setAnchorEl(null);

        } catch (error) {

            console.log(error);

        }

    };
    useEffect(() => {

        loadNotifications();

        loadNotificationCount();

        loadUser();

        const interval = setInterval(() => {

                loadNotifications();

                loadNotificationCount();

            }, 5000);

            return () => clearInterval(interval);

    }, []);

    return (

        <AppBar
            position="fixed"
            elevation={1}
            sx={{
                width: "calc(100% - 260px)",
                ml: "260px",
                bgcolor: "#ffffff",
                color: "#000",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}
        >

            <Toolbar>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ flexGrow: 1 }}
                >
                    Dashboard
                </Typography>

                <Box
                    display="flex"
                    alignItems="center"
                    gap={3}
                >

                    <IconButton
                        onClick={(e) => {

                            setAnchorEl(e.currentTarget);

                            markAsRead();

                        }}
                    >

                        <Badge
                            badgeContent={notificationCount}
                            color="error"
                        >

                            <NotificationsIcon />

                        </Badge>

                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >

                        {
                            notifications.length === 0 ? (

                                <MenuItem>

                                    No Notifications

                                </MenuItem>

                            ) : (

                                <>
                                    {
                                        notifications.map((notification) => (

                                            <MenuItem
                                                key={notification.id}
                                            >

                                                <Box>

                                                    <Typography fontWeight="bold">

                                                        {notification.message}

                                                    </Typography>

                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >

                                                        {new Date(notification.created_at).toLocaleString()}

                                                    </Typography>

                                                </Box>

                                            </MenuItem>

                                        ))
                                    }

                                    <MenuItem
                                        onClick={clearNotifications}
                                        sx={{
                                            color: "red",
                                            fontWeight: "bold",
                                            justifyContent: "center"
                                        }}
                                    >
                                        🗑 Clear All
                                    </MenuItem>

                                </>

                            )
                        }

                    </Menu>

                    <Typography
                        fontWeight="600"
                    >
                        Welcome, {user.name}
                    </Typography>

                    <Avatar
                        sx={{
                            bgcolor: "#4F46E5"
                        }}
                    >
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </Avatar>

                </Box>

            </Toolbar>

        </AppBar>

    );

}

export default Navbar;