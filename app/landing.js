"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Button, Box, Grid, Card, CardContent, CardMedia, Tab, Tabs } from "@mui/material";
import { useState } from 'react';

function CustomTabPanel({ value, index, children }) {
    return value === index && (
        <Box sx={{ p: 3 }}>
            {children}
        </Box>
    );
}

export default function Landing() {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <main>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            Flashcard Creator
                        </Typography>
                        <SignedOut>
                            <Button color="inherit" href="/sign-in">Login</Button>
                            <Button color="inherit" href="/sign-up">Sign Up</Button>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </Toolbar>
                </AppBar>
                {/* hero section */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh', textAlign: 'center', my: 4 }}>
                    <Box>
                        <Typography variant="h2" component="h1" gutterBottom>
                            Create Flashcards Effortlessly
                        </Typography>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Transform your notes into interactive flashcards.
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} href="/generate">
                            Start Creating
                        </Button>
                        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                            Learn More
                        </Button>
                    </Box>
                </Box>
            </div>
        </main>
    );
}