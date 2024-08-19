"use client";

import { useUser } from "@clerk/nextjs";
import {
    Typography,
    Container,
    Box,
    Grid,
    Card,
    TextField,
    Button,
    CardActionArea,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions, InputAdornment, CircularProgress,
} from "@mui/material";

import { db } from "@/firebase";
import { collection, doc, getDoc, writeBatch, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import CustomAppBar from "@/app/appbar";
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const [text, setText] = useState("");
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/sign-in');
        } else if (isLoaded && isSignedIn) {
            setIsAuthenticated(true);
        }
    }, [isLoaded, isSignedIn, router]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch("api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ content: text }),
            });

            if (!response.ok) {
                console.error("Response error:", {
                    status: response.status,
                    statusText: response.statusText,
                    body: await response.text()
                });
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setFlashcards(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const saveFlashcards = async () => {
        if (!name) {
            alert("Please enter a name");
            return;
        }
        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, "users"), user.id);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || [];
            if (collections.find((f) => f.name === name)) {
                alert("Flashcard collection with the same name already exists.");
                return;
            } else {
                collections.push({ name });
                batch.set(userDocRef, { flashcards: collections }, { merge: true });
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ name }] });
        }

        const colRef = collection(userDocRef, name);
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef);
            batch.set(cardDocRef, flashcard);
        });

        await batch.commit();
        handleClose();
        router.push("/flashcards");
    };

    if (!isAuthenticated) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>            
        );
    }

    return (
        <> <CustomAppBar />
            <Container maxWidth="md">
                <Box
                    sx={{
                        mt: 4,
                        mb: 6,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 4 }}>Generate FlashCards</Typography>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Type in to generate Flashcards"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Box>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    flashcards.length > 0 && (
                        <Box sx={{ mt: 4, mb: 4 }}>
                            <Typography variant="h5" gutterBottom align="center">
                                Flashcards Preview
                            </Typography>
                            <Grid container spacing={3}>
                                {flashcards.map((flashcard, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card>
                                            <CardActionArea onClick={() => handleCardClick(index)}>
                                                <CardContent sx={{margin:0, padding:0}}>
                                                    <Box
                                                        sx={{
                                                            perspective: "1000px",
                                                            "& > div": {
                                                                transition: "transform 0.6s",
                                                                transformStyle: "preserve-3d",
                                                                position: "relative",
                                                                width: "100%",
                                                                height: "200px",
                                                                background: "linear-gradient(#F9EFAF, #F7E98D)",
                                                                transform: flipped[index] ? "rotateY(180deg)" : "rotateY(0deg)",
                                                            },
                                                            "& > div > div": {
                                                                position: "absolute",
                                                                width: "100%",
                                                                height: "200px",
                                                                backfaceVisibility: "hidden",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                padding: 2,
                                                                boxSizing: "border-box",
                                                            },
                                                            "& > div > div:nth-of-type(1)": {
                                                                visibility: flipped[index] ? "hidden" : "visible",
                                                            },
                                                            "& > div > div:nth-of-type(2)": {
                                                                transform: "rotateY(180deg)",
                                                                visibility: flipped[index] ? "visible" : "hidden",
                                                            },
                                                        }}
                                                    >
                                                        <div>
                                                            <div>
                                                                <Typography variant="h5" component="div" sx={{ fontFamily: 'Gloria Hallelujah, cursive', fontSize: "1.3rem", padding: "10px" }}>
                                                                    {flashcard.front}
                                                                </Typography>
                                                            </div>
                                                            <div>
                                                                <Typography variant="h5" component="div" sx={{ fontFamily: 'Gloria Hallelujah, cursive', fontSize: "1.0rem" }}>
                                                                    {flashcard.back}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </Box>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            <Box sx={{ mt: 4, mb:4, display: "flex", justifyContent: "center" }}>
                                <Button variant="contained" sx={{ backgroundColor: '#1565c0' }} onClick={handleOpen}>
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    )
                )}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Save Flashcards</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your flashcards collection
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Collection Name"
                            type="text"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined"
                        ></TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={saveFlashcards}>Save</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
}