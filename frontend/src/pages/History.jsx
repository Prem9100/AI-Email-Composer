import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    TextField,
    TablePagination
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

function History() {

    const navigate = useNavigate();
    
    const [emails, setEmails] = useState([]);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const loadHistory = async () => {

        try {

            const response = await api.get("/emails/history");

            setEmails(response.data);

        } catch (error) {

            console.log(error);

        }

    };
    const deleteEmail = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this email?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(`/emails/${id}`);

            alert("Email deleted successfully!");

            loadHistory();

        } catch (error) {

            console.log(error);

            alert("Unable to delete email.");

        }

    };

    useEffect(() => {

        loadHistory();

    }, []);
    const filteredEmails = emails.filter((email) => {

        return (

            email.subject.toLowerCase().includes(search.toLowerCase()) ||

            email.email_type.toLowerCase().includes(search.toLowerCase()) ||

            email.tone.toLowerCase().includes(search.toLowerCase())

        );

    });
    const handleChangePage = (event, newPage) => {

        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));

        setPage(0);

    };

    return (

        <Layout>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
            >
                Email History
            </Typography>

            <TextField

                fullWidth

                label="Search Emails"

                placeholder="Search by Subject, Type or Tone"

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

                sx={{
                    mb:3
                }}

            />

            <Paper elevation={3}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell><b>ID</b></TableCell>

                            <TableCell><b>Subject</b></TableCell>

                            <TableCell><b>Type</b></TableCell>

                            <TableCell><b>Tone</b></TableCell>

                            <TableCell><b>Actions</b></TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            filteredEmails
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                ).map((email) => (

                                <TableRow key={email.id}>

                                    <TableCell>

                                        {email.id}

                                    </TableCell>

                                    <TableCell>

                                        {email.subject}

                                    </TableCell>

                                    <TableCell>

                                        {email.email_type}

                                    </TableCell>

                                    <TableCell>

                                        {email.tone}

                                    </TableCell>

                                    <TableCell>

                                        <IconButton
                                            color="primary"
                                            onClick={() =>
                                                navigate(`/emails/${email.id}`)
                                            }
                                        >

                                            <VisibilityIcon />

                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={() => deleteEmail(email.id)}
                                        >

                                            <DeleteIcon />

                                        </IconButton>

                                    </TableCell>

                                </TableRow>

                            ))

                        }

                    </TableBody>

                </Table>

                    <TablePagination

                        component="div"

                        count={filteredEmails.length}

                        page={page}

                        rowsPerPage={rowsPerPage}

                        onPageChange={handleChangePage}

                        onRowsPerPageChange={handleChangeRowsPerPage}

                        rowsPerPageOptions={[5,10,20]}

                    />

                </Paper>

        </Layout>

    );

}

export default History;