import { Paper, Box, Typography } from "@mui/material";
import React from 'react';

export const PointsComponent = ({ totalPoints }) => {
    return (
        <Paper elevation={2}>
            <Box p={2} textAlign={"center"}>
                <Typography variant={"h4"}>
                    Score : <br />{totalPoints}
                </Typography>
            </Box>
        </Paper>
    );
}