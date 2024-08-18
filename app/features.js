// Code for the Features section of the landing page
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import {Divider} from "@mui/joy";

export default function Features() {
    return (
        <Box sx={{ padding: 3, textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ marginBottom: 6 }}>Features</Typography>
            <Grid container spacing={8} justifyContent="center">
                <Grid item xs={12} sm={4} md={3}>
                    <Card sx={{ maxWidth: '100%' }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="https://img.freepik.com/free-vector/realistic-ui-ux-background_52683-69487.jpg?size=626&ext=jpg"
                            title="Easy to Use"
                        />
                        <CardContent sx={{ textAlign: 'left' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Easy to Use
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Create flashcards with a simple and intuitive interface.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Card sx={{ maxWidth: '100%' }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="https://img.freepik.com/free-vector/realistic-ui-ux-background_52683-69487.jpg?size=626&ext=jpg"
                            title="Customizable"
                        />
                        <CardContent sx={{ textAlign: 'left' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Customizable
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Customize your flashcards with different styles and formats.
                            </Typography>
                        </CardContent>
                    </Card>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
                <Card sx={{ maxWidth: '100%' }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image="https://img.freepik.com/free-vector/realistic-ui-ux-background_52683-69487.jpg?size=626&ext=jpg"
                        title="Share and Collaborate"
                    />
                    <CardContent sx={{ textAlign: 'left' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            Share and Collaborate
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Share your flashcards with friends and collaborate in real-time.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            </Grid>
            <Divider sx={{ width: '50%', margin: '4rem auto 0' }} />
        </Box>
        
    );
}