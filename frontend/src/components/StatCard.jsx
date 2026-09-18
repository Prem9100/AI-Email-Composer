import { Card, CardContent, Typography, Box } from "@mui/material";

function StatCard({
    title,
    value,
    icon,
    color
}) {

    return (

        <Card
            elevation={4}
            sx={{
                borderRadius: 4,
                height: 200,          // Increase card height
                padding: 2,
                transition: "0.3s",
                cursor: "pointer",

                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 10,
                }
            }}
        >

            <CardContent>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Box>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            mt={1}
                        >
                            {value}
                        </Typography>

                    </Box>

                    <Box
                        sx={{
                            background: color,
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: 40
                        }}
                    >

                        {icon}

                    </Box>

                </Box>

            </CardContent>

        </Card>

    );

}

export default StatCard;