﻿'use client';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import {Container, Grid, Box, Typography, Card, CardActionArea, CardContent, Button} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import ArrowBack from '@mui/icons-material/ArrowBack';

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const router = useRouter(); // Initialize router
    const searchParams = useSearchParams();
    const search = searchParams.get('id');

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) {
                return;
            }
            const colRef = collection(doc(collection(db, 'users'), user.id), search);
            const docs = await getDocs(colRef);
            const flashcards = [];

            docs.forEach((doc) => {
                flashcards.push({ id: doc.id, ...doc.data() });
            });
            setFlashcards(flashcards);
            localStorage.setItem('flashcards', JSON.stringify(flashcards));
        }
        getFlashcard();
    }, [user, search]);

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if (!isLoaded || !isSignedIn) {
        return <></>;
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                    variant="contained"
                    sx={{ fontFamily: 'Kalam, cursive', mt: 5, mb: 2, color: 'primary'}}
                    onClick={() => router.back()}
                >
                    <ArrowBack />
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontFamily: 'Kalam, cursive', mt: 5, mb: 2 }}
                    onClick={() => router.push('/practice')}
                >
                    Practice Flashcards
                </Button>
                
            </Box>
        <Container maxWidth="100vw">
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(index)}>
                                <CardContent sx={{backgroundColor: "#E2DFD2"}}>
                                    <Box
                                        sx={{
                                            perspective: "1000px",
                                            "& > div": {
                                                transition: "transform 0.6s",
                                                transformStyle: "preserve-3d",
                                                position: "relative",
                                                width: "100%",
                                                height: "200px",
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
                                                <Typography variant="h5" component="div" sx={{ fontFamily: 'Kalam, cursive', fontSize: "1.0rem" }}>
                                                    {flashcard.front}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography variant="h5" component="div" sx={{ fontFamily: 'Kalam, cursive', fontSize: "1.0rem" }}>
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
        </Container>
        </>
    );
}
