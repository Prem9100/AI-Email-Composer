import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Box
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function QuickAction({

    title,
    subtitle,
    icon,
    color,
    path

}) {

    const navigate = useNavigate();

    return (

        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                transition: "0.3s",
                cursor: "pointer",

                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 8,
                },
            }}
        >

            <CardActionArea
                onClick={() => navigate(path)}
            >

                <CardContent>

                    <Box
                        display="flex"
                        alignItems="center"
                    >

                        <Box
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                background: color,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#fff",
                                mr: 2,
                            }}
                        >

                            {icon}

                        </Box>

                        <Box>

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                            >

                                {title}

                            </Typography>

                            <Typography
                                color="text.secondary"
                            >

                                {subtitle}

                            </Typography>

                        </Box>

                    </Box>

                </CardContent>

            </CardActionArea>

        </Card>

    );

}

export default QuickAction;