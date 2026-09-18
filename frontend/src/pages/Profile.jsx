import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

function Profile() {

    const [user, setUser] = useState({
        name: "",
        email: ""
    });

    const [open, setOpen] = useState(false);
    
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await api.get("/users/me");

            setUser(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const updateProfile = async () => {

        try {

            await api.put("/users/profile", {
                name: user.name,
                email: user.email
            });

            setOpen(true);

            loadProfile();

        } catch (error) {

            console.log(error);

            alert("Unable to update profile.");

        }

    };

    const changePassword = async () => {

        if (newPassword !== confirmPassword) {

            alert("New Password and Confirm Password do not match.");

            return;

        }

        try {

            await api.put("/users/change-password", {
                current_password: currentPassword,
                new_password: newPassword
            });

            alert("Password Changed Successfully!");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {

            if (error.response) {

                alert(error.response.data.detail);

            } else {

                alert("Unable to change password.");

            }

        }

    };

    return (

        <Layout>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
            >

                My Profile

            </Typography>

            <Grid container justifyContent="center">

                <Grid item xs={12} md={6}>

                    <Card
                        elevation={4}
                        sx={{
                            borderRadius: 4
                        }}
                    >

                        <CardContent>

                            <Box
                                display="flex"
                                justifyContent="center"
                                mb={3}
                            >

                                <Avatar
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        bgcolor: "#4F46E5"
                                    }}
                                >

                                    <PersonIcon
                                        sx={{
                                            fontSize: 60
                                        }}
                                    />

                                </Avatar>

                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <TextField
                                fullWidth
                                label="Full Name"
                                value={user.name}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        name: e.target.value
                                    })
                                }
                                sx={{ mb: 3 }}
                            />

                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={user.email}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        email: e.target.value
                                    })
                                }
                                sx={{ mb: 3 }}
                            />

                            <Typography
                                color="text.secondary"
                            >

                                Role

                            </Typography>

                            <Typography
                                variant="h6"
                                mb={4}
                            >

                                User

                            </Typography>

                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ mb: 2 }}
                                onClick={updateProfile}
                            >

                                Save Changes

                            </Button>

                            <Typography
                                variant="h6"
                                mt={4}
                                mb={2}
                            >
                                Change Password
                            </Typography>

                            <TextField
                                fullWidth
                                type="password"
                                label="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                fullWidth
                                type="password"
                                label="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                fullWidth
                                type="password"
                                label="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                sx={{ mb: 3 }}
                            />

                            <Button
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                onClick={changePassword}
                            >
                                Change Password
                            </Button>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Profile Updated Successfully!
                </Alert>
            </Snackbar>

        </Layout>

    );

}

export default Profile;