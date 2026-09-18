import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import QuickAction from "../components/QuickAction";

import {
    Grid,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Box
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SaveIcon from "@mui/icons-material/Save";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";

function Dashboard() {

    const [stats, setStats] = useState({

        total_emails: 0,

        generated_today: 0,

        saved_emails: 0,

        recent_emails: []

    });
    const loadDashboard = async () => {

        try {

            const response = await api.get(
                "/dashboard/stats"
            );

            setStats(response.data);

        }

        catch(error){

            console.log(error);

        }

    };
    useEffect(() => {

        loadDashboard();

    }, []);

    return (

        <Layout>

            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
            >
                <br></br>
                Welcome Back 👋
            </Typography>

            <Typography
                color="text.secondary"
                mb={4}
            >
                Manage your AI-generated emails from one place.
            </Typography>

            {/* Statistics */}

            <Grid container spacing={3}>

                <Grid item xs={12} md={4}>

                    <StatCard
                        title="Total Emails"
                        value={stats.total_emails}
                        color="#4F46E5"
                        icon={<EmailIcon fontSize="large" />}
                    />

                </Grid>

                <Grid item xs={12} md={4}>

                    <StatCard
                        title="Generated Today"
                        value={stats.generated_today}
                        color="#06B6D4"
                        icon={<AutoAwesomeIcon fontSize="large" />}
                    />

                </Grid>

                <Grid item xs={12} md={4}>

                    <StatCard
                        title="Saved Emails"
                        value={stats.saved_emails}
                        color="#10B981"
                        icon={<SaveIcon fontSize="large" />}
                    />

                </Grid>

            </Grid>

            {/* Quick Actions */}

            <Typography
                variant="h5"
                fontWeight="bold"
                mt={5}
                mb={2}
            >
                Quick Actions
            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} md={4}>

                    <QuickAction
                        title="Generate Email"
                        subtitle="Create AI-powered emails"
                        icon={<AutoAwesomeIcon fontSize="large" />}
                        color="#4F46E5"
                        path="/generate"
                    />

                </Grid>

                <Grid item xs={12} md={4}>

                    <QuickAction
                        title="Email History"
                        subtitle="View generated emails"
                        icon={<HistoryIcon fontSize="large" />}
                        color="#06B6D4"
                        path="/history"
                    />

                </Grid>

                <Grid item xs={12} md={4}>

                    <QuickAction
                        title="Profile"
                        subtitle="Manage your account"
                        icon={<PersonIcon fontSize="large" />}
                        color="#10B981"
                        path="/profile"
                    />

                </Grid>

            </Grid>

            {/* Recent Emails */}

            <Typography
                variant="h5"
                fontWeight="bold"
                mt={5}
                mb={2}
            >
                Recent Emails
            </Typography>

            <Paper
                elevation={3}
                sx={{
                    borderRadius: 3,
                    overflow: "hidden"
                }}
            >

                <List>

                    {stats.recent_emails.length === 0 ? (

                        <ListItem>

                            <ListItemText
                                primary="No emails generated yet."
                            />

                        </ListItem>

                    ) : (

                        stats.recent_emails.map((email) => (

                            <div key={email.id}>

                                <ListItem>

                                    <ListItemText
                                        primary={email.subject}
                                        secondary={`${email.email_type} • ${email.tone}`}
                                    />

                                </ListItem>

                                <Divider />

                            </div>

                        ))

                    )}

                </List>

            </Paper>

            {/* Footer */}

            <Box
                mt={5}
                textAlign="center"
            >

                <Typography
                    color="text.secondary"
                >
                    © 2026 AI Email Composer | Developed with React + FastAPI + Gemini AI
                </Typography>

            </Box>

        </Layout>

    );

}

export default Dashboard;