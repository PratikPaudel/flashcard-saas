import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
// The page uses Material-UI’s `Container` and `Box` components to create a centered, responsive layout. The `maxWidth=”sm”` prop on the Container ensures the content doesn’t stretch too wide on larger screens.
    return(
        <main>
            <div>
                <AppBar position="static" sx={{backgroundColor: '#3f51b5'}}>
                    <Toolbar>
                        <Typography variant="h6" sx={{flexGrow: 1}}>
                            Flashcard SaaS
                        </Typography>
                        <Button color="inherit">
                            <Link href="/sign-up" passHref> 
                                Login
                            </Link>
                        </Button>
                        <Link href="/sign-up">Sign Up</Link>
                    </Toolbar>
                </AppBar>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{textAlign: 'center', my: 4}}
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        Sign Up
                    </Typography>
                    <SignUp />
                    {/* - The `SignUp` component from Clerk, which handles the actual sign-up process, a pre-built, customizable component that handles various authentication methods. It typically includes fields for email/username and password, as well as options for social logins or other authentication methods you’ve configured in your Clerk settings. */}
                </Box>
            </div>
        </main>

    )
}