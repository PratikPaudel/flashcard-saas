import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function CustomAppBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography component="a" href="/" variant="h6" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    Flashcard Creator
                </Typography>
                <SignedOut>
                    <Button color="inherit" href="/sign-in">Login</Button>
                    <Button color="inherit" href="/sign-up">Sign Up</Button>
                </SignedOut>
                <SignedIn>
                    <Button color="inherit" href="/flashcards" sx={{ mr: 2 }}>My Cards</Button>
                    <UserButton />
                </SignedIn>
            </Toolbar>
        </AppBar>
    );
}