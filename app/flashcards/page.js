'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import {Container, Grid, Box, Typography, Card, CardActionArea, CardContent, Button} from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import CustomAppBar from "@/app/appbar";
import Flashcard from "@/app/flashcard/page.js";
import ArrowBack from "@mui/icons-material/ArrowBack";
export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [collections, setCollections] = useState([]);
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const searchParams = useSearchParams();
    const search = searchParams.get('id');
    const router = useRouter();

    useEffect(() => {
        async function getCollections() {
            if (!user) {
                return;
            }
            const userDocRef = doc(collection(db, 'users'), user.id);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setCollections(data.flashcards || []);
            }
        }

        getCollections();
    }, [user]);

    useEffect(() => {
        async function getFlashcards() {
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
        }

        getFlashcards();
    }, [user, search]);

    const handleCollectionClick = (name) => {
        router.push(`/flashcards?id=${name}`);
    };

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
            <CustomAppBar />
            {!search && (
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
                        onClick={() => router.push('/generate')}
                    >
                        Create Flashcards
                    </Button>
                </Box>
            )}

            <Container maxWidth="md">
                {!search ? (
                    <Box sx={{ mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h4">Your Flashcard Collections</Typography>
                        <Grid container spacing={3} sx={{ mt: 4 }}>
                            {collections.map((collection, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Box sx={{ position: 'relative', width: '100%', height: '100px', padding: '5rem' }} onClick={() => handleCollectionClick(collection.name)}>
                                        <Card
                                            sx={{
                                                position: 'absolute',
                                                top: '0',
                                                left: '0',
                                                height: '100px',
                                                width: '100%',
                                                backgroundColor: '#F9F6EE',
                                                zIndex: 0,
                                                marginX: '-2rem',
                                                boxShadow: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <CardActionArea>
                                                <CardContent></CardContent>
                                            </CardActionArea>
                                        </Card>

                                        <Card
                                            sx={{
                                                position: 'absolute',
                                                top: '10px',
                                                left: '10px',
                                                height: '100px',
                                                width: '100%',
                                                backgroundColor: '#E2DFD2',
                                                zIndex: 1,
                                                boxShadow: 'none',
                                                marginX: '-2rem',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <CardActionArea>
                                                <CardContent></CardContent>
                                            </CardActionArea>
                                        </Card>

                                        {/* Top Layer */}
                                        <Card
                                            sx={{
                                                position: 'absolute',
                                                top: '20px',
                                                left: '20px',
                                                height: '100px',
                                                width: '100%',
                                                backgroundColor: '#EDEADE',
                                                zIndex: 2,
                                                marginX: '-2rem',
                                                boxShadow: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography variant="h5" component="div">
                                                        {collection.name}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ) : (
                    <Flashcard />
                )}
            </Container>
        </>
    );
}