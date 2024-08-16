"use client";
import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import {Box, Button} from '@mui/material';
import { handleSubmit } from './page.js';
export default function PricingTabs() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                paddingBottom: 5,
            }}
        >
            <Tabs
                variant="outlined"
                aria-label="Pricing plan"
                defaultValue={0}
                sx={{
                    width: 750,
                    borderRadius: 'lg',
                    boxShadow: 'sm',
                    overflow: 'auto',
                    height: 200,
                }}
            >
                <TabList
                    disableUnderline
                    tabFlex={1}
                    sx={{
                        [`& .${tabClasses.root}`]: {
                            fontSize: 'sm',
                            fontWeight: 'lg',
                            [`&[aria-selected="true"]`]: {
                                color: 'primary.500',
                                bgcolor: 'background.surface',
                            },
                            [`&.${tabClasses.focusVisible}`]: {
                                outlineOffset: '-4px',
                            },
                        },
                    }}
                >
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                        Basic
                    </Tab>
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                        Standard
                    </Tab>
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                        Premium
                    </Tab>
                </TabList>
                <TabPanel value={0}>
                    <Typography level="inherit">
                        Perfect for individuals who are just getting started with flashcards.
                    </Typography>
                    <Typography textColor="success.400" fontSize="xl3" fontWeight="xl" mt={1}>
                        $0{' '}
                        <Typography fontSize="sm" textColor="text.secondary" fontWeight="md">
                            － Free forever
                        </Typography>
                    </Typography>
                </TabPanel>
                <TabPanel value={1}>
                    <Typography level="inherit">
                        Ideal for students and professionals who need more features.
                    </Typography>
                    <Typography textColor="primary.400" fontSize="xl3" fontWeight="xl" mt={1}>
                        $1{' '}
                        <Typography fontSize="sm" textColor="text.secondary" fontWeight="md">
                            / user / month
                        </Typography>
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleSubmit('basic')}>
                        Subscribe
                    </Button>
                </TabPanel>
                <TabPanel value={2}>
                    <Typography level="inherit">
                        Best for teams and organizations requiring advanced features and support.
                    </Typography>
                    <Typography textColor="primary.400" fontSize="xl3" fontWeight="xl" mt={1}>
                        <Typography
                            fontSize="xl"
                            borderRadius="sm"
                            px={0.5}
                            mr={0.5}
                            sx={(theme) => ({
                                ...theme.variants.soft.danger,
                                color: 'danger.400',
                                verticalAlign: 'text-top',
                                textDecoration: 'line-through',
                            })}
                        >
                            $3
                        </Typography>
                        $2*{' '}
                        <Typography fontSize="sm" textColor="text.secondary" fontWeight="md">
                            / user / month
                        </Typography>
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleSubmit('pro')}>
                        Subscribe
                    </Button>
                </TabPanel>
            </Tabs>
        </Box>
    );
}