'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { Container, Box, Typography, Button } from '@mui/material';
import CustomAppBar from '@/app/appbar';
import {Divider} from "@mui/joy";
export default function Practice() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('id');
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        const storedFlashcards = localStorage.getItem('flashcards');
        if (storedFlashcards) {
            setFlashcards(JSON.parse(storedFlashcards));
        } else {
            async function getFlashcards() {
                if (!search) {
                    return;
                }
                const colRef = collection(doc(collection(db, 'users'), 'user-id'), search);
                const docs = await getDocs(colRef);
                const flashcards = [];

                docs.forEach((doc) => {
                    flashcards.push({ id: doc.id, ...doc.data() });
                });
                setFlashcards(flashcards);
            }
            getFlashcards();
        }
    }, [search]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setFlipped(false);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
        setFlipped(false);
    };

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    if (flashcards.length === 0) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <CustomAppBar />
            <Container maxWidth="md">
                <Box sx={{ mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ fontFamily: 'Kalam, cursive', mb: 4 }}>
                        Practice Your Flashcards
                    </Typography>
                    <div className="deck" onClick={handleFlip}>
                        <div className={`card ${flipped ? 'flip' : ''}`}>
                            <div className="card__front">
                                <Typography variant="h5" component="div">
                                    {flashcards[currentIndex].front}
                                </Typography>
                            </div>
                            <div className="card__back">
                                <Typography variant="h5" component="div">
                                    {flashcards[currentIndex].back}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Button variant="contained" color="primary" onClick={handlePrev}>
                            Previous
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            Next
                        </Button>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push('/flashcards')}
                        sx={{ mt: 4 }}
                    >
                        Back to Flashcards
                    </Button>
                </Box>
            </Container>
            <style jsx>{`
                .deck {
                    perspective: 1200px;
                    position: relative;
                    width: 300px;
                    height: 400px;
                }
                .card {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    border-radius: 10px;
                    transform-style: preserve-3d;
                    transition: transform 0.8s;
                }
                .card__front, .card__back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    border-radius: inherit;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    padding: 20px;
                }
                .card__front {
                    background: hsl(0, 0%, 100%);
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .card__back {
                    background: hsl(195, 100%, 60%);
                    color: hsl(0, 0%, 100%);
                    transform: rotateY(180deg);
                }
                .card.flip {
                    transform: rotateY(180deg);
                }
            `}</style>
        </>
    );
}