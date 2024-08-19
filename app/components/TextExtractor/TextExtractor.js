'use client';
import { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PDFParserService from './PDFParser'; // Make sure this points to the client-side version
import ImageParserService from './ImageParser';

const TextExtractor = ({ onExtract }) => {
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setLoading(true);
            try {
                let extractedText = '';
                let contentType = '';
                if (file.type === 'application/pdf') {
                    extractedText = await PDFParserService.getTextFromPDF(file);
                    contentType = 'pdf';
                } else if (file.type.startsWith('image/')) {
                    extractedText = await ImageParserService.getTextFromImage(file);
                    contentType = 'image';
                } else {
                    console.error('Unsupported file type');
                }
                onExtract(extractedText, contentType);
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
        </Box>
    );
};

export default TextExtractor;