import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import api from "../services/api";

import {
    Paper,
    Typography,
    Divider,
    CircularProgress,
    Box
} from "@mui/material";

function ViewEmail() {

    const { id } = useParams();

    const [email, setEmail] = useState(null);

    const loadEmail = async () => {

        try {

            const response = await api.get(
                `/emails/${id}`
            );

            setEmail(response.data);

        }

        catch(error){

            console.log(error);

        }

    };

    useEffect(() => {

        loadEmail();

    }, []);

    if(!email){

        return(

            <Layout>

                <Box
                    display="flex"
                    justifyContent="center"
                    mt={10}
                >

                    <CircularProgress />

                </Box>

            </Layout>

        );

    }

    return(

        <Layout>

            <Paper
                elevation={3}
                sx={{
                    p:4,
                    borderRadius:3
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    {email.subject}
                </Typography>

                <Divider sx={{my:3}}/>

                <Typography
                    variant="body1"
                    sx={{
                        whiteSpace:"pre-line",
                        lineHeight:2
                    }}
                >

                    {email.body}

                </Typography>

            </Paper>

        </Layout>

    );

}

export default ViewEmail;