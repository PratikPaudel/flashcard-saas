'use client';
import { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PDFParserService from './PDFParser'; // Make sure this points to the client-side version
import ImageParserService from './ImageParser';

const TextExtractor = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setLoading(true);
            try {
                if (file.type === 'application/pdf') {
                    const extractedText = await PDFParserService.getTextFromPDF(file);
                    setText(extractedText);
                } else if (file.type.startsWith('image/')) {
                    const extractedText = await ImageParserService.getTextFromImage(file);
                    setText(extractedText);
                } else {
                    console.error('Unsupported file type');
                }
            } catch (error) {
                console.error('Error extracting text:', error);
            }
            setLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
        >
            <input
                type="file"
                id="fileInput"
                accept=".pdf, image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            <Box mb={2}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PhotoCamera />}
                    onClick={() => document.getElementById('fileInput').click()}
                    style={{ marginRight: '10px' }}
                >
                    Upload PDF/Image
                </Button>
            </Box>

            {loading && <CircularProgress />}
            {text && <Typography variant="body1" component="pre">{text}</Typography>}
        </Box>
    );
};

export default TextExtractor;
