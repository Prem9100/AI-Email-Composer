import { useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";
import {
    Paper,
    Typography,
    TextField,
    Grid,
    MenuItem,
    Button,
    CircularProgress,
    Box,
    Divider
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function GenerateEmail() {

    const [scenario, setScenario] = useState("");

    const [emailType, setEmailType] = useState("Leave Request");

    const [tone, setTone] = useState("Professional");

    const [length, setLength] = useState("Medium");

    const [loading, setLoading] = useState(false);

    const [subject, setSubject] = useState("");

    const [body, setBody] = useState("");

    const copyEmail = () => {

    navigator.clipboard.writeText(

        `Subject: ${subject}\n\n${body}`

    );

    toast.success("Email copied successfully!");

    };
    const downloadPDF = () => {

    const pdf = new jsPDF();

        pdf.setFontSize(18);
        pdf.text(subject, 20, 20);

        pdf.setFontSize(12);

        const lines = pdf.splitTextToSize(body, 170);

        pdf.text(lines, 20, 40);

        pdf.save("Generated_Email.pdf");

        toast.success("PDF Downloaded!");

    };
    const saveEmail = async () => {

        try {

            await api.post(
                "/emails/save",
                {
                    subject: subject,
                    body: body,
                    scenario: scenario,
                    email_type: emailType,
                    tone: tone
                }
            );

            toast.success("Email Saved Successfully!");

        } catch (error) {

            console.error(error);

            toast.error("Failed to save email.");

        }

    };

    const generateEmail = async () => {

        if (!scenario.trim()) {
            alert("Please enter a business scenario.");
            return;
        }

        setLoading(true);

        try {

            const response = await api.post(
                "/emails/generate",
                {
                    scenario,
                    email_type: emailType,
                    tone,
                    length
                }
            );

            setSubject(response.data.subject);
            setBody(response.data.body);

        }

        catch (error) {

            console.log(error);

            alert("Unable to generate email.");

        }

        finally {

            setLoading(false);

        }

    };
    

    return (

        <Layout>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
            >
                Generate Professional Email
            </Typography>

            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 3
                }}
            >

                <TextField

                    label="Business Scenario"

                    multiline

                    rows={6}

                    fullWidth

                    value={scenario}

                    onChange={(e) =>
                        setScenario(e.target.value)
                    }

                />

                <Grid
                    container
                    spacing={3}
                    mt={2}
                >

                    <Grid item xs={12} md={4}>

                        <TextField
                            select
                            fullWidth
                            label="Email Type"
                            value={emailType}
                            onChange={(e) =>
                                setEmailType(e.target.value)
                            }
                        >

                            <MenuItem value="Leave Request">
                                Leave Request
                            </MenuItem>

                            <MenuItem value="Meeting Request">
                                Meeting Request
                            </MenuItem>

                            <MenuItem value="Job Application">
                                Job Application
                            </MenuItem>

                            <MenuItem value="Business Proposal">
                                Business Proposal
                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <TextField
                            select
                            fullWidth
                            label="Tone"
                            value={tone}
                            onChange={(e) =>
                                setTone(e.target.value)
                            }
                        >

                            <MenuItem value="Professional">
                                Professional
                            </MenuItem>

                            <MenuItem value="Formal">
                                Formal
                            </MenuItem>

                            <MenuItem value="Friendly">
                                Friendly
                            </MenuItem>

                            <MenuItem value="Persuasive">
                                Persuasive
                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <TextField
                            select
                            fullWidth
                            label="Length"
                            value={length}
                            onChange={(e) =>
                                setLength(e.target.value)
                            }
                        >

                            <MenuItem value="Short">
                                Short
                            </MenuItem>

                            <MenuItem value="Medium">
                                Medium
                            </MenuItem>

                            <MenuItem value="Long">
                                Long
                            </MenuItem>

                        </TextField>

                    </Grid>

                </Grid>

                <Button

                    variant="contained"

                    startIcon={<AutoAwesomeIcon />}

                    sx={{
                        mt: 4
                    }}

                    onClick={generateEmail}

                >

                    {

                        loading

                            ?

                            <CircularProgress
                                size={25}
                                color="inherit"
                            />

                            :

                            "Generate Email"

                    }

                </Button>

            </Paper>

            {

                body &&

                <Paper
                    elevation={3}
                    sx={{
                        mt: 4,
                        p: 4,
                        borderRadius: 3
                    }}
                >

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                    >
                        Subject
                    </Typography>

                    <Typography
                        mb={3}
                    >
                        {subject}
                    </Typography>

                    <Divider />

                    <Typography
                        variant="h5"
                        mt={3}
                        fontWeight="bold"
                    >
                        Email
                    </Typography>

                    <Box
                        mt={2}
                        sx={{
                            whiteSpace: "pre-line"
                        }}
                    >

                        {body}

                    </Box>

                </Paper>

            }

        </Layout>

    );

}

export default GenerateEmail;