import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Chip,
    CircularProgress,
    Divider,
    Paper,
    Typography
} from '@mui/material';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const TourItinerary = ({ itinerary, loading, error }) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
                <Typography variant="body1" sx={{ ml: 2 }}>
                    Generating your personalized itinerary...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: '#ffebee',
                    mb: 4
                }}
            >
                <Typography variant="h6" color="error" gutterBottom>
                    Error Generating Itinerary
                </Typography>
                <Typography variant="body1">
                    {error}. Please try again or modify your tour details.
                </Typography>
            </Paper>
        );
    }

    if (!itinerary) {
        return null;
    }

    // Split the itinerary into sections based on numbered lists
    const sections = itinerary.split(/\d+\.\s/).filter(Boolean);
    const sectionTitles = [
        "Day-by-day Itinerary",
        "Transportation Options",
        "Meal Plans",
        "Accommodation Options",
        "Cost Breakdown",
        "Local Tips",
        "Packing Suggestions"
    ];

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                borderRadius: 2,
                background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
                mb: 4
            }}
        >
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Your AI-Generated Itinerary
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
                <Chip
                    label="Powered by Gemini AI"
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ mb: 2 }}
                />
                <Typography variant="body1" color="text.secondary" paragraph>
                    Below is your personalized travel itinerary based on your preferences. You can edit your tour details or save this plan.
                </Typography>
            </Box>

            {sections.length > 0 ? (
                sections.map((section, index) => (
                    <Accordion
                        key={index}
                        expanded={expanded === `panel${index}`}
                        onChange={handleChange(`panel${index}`)}
                        sx={{
                            mb: 2,
                            '&:before': { display: 'none' },
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                bgcolor: 'rgba(25, 118, 210, 0.05)',
                                borderRadius: '4px 4px 0 0'
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {index < sectionTitles.length ? sectionTitles[index] : `Section ${index + 1}`}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ p: 1 }}>
                                <ReactMarkdown>
                                    {section.trim()}
                                </ReactMarkdown>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Box sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                    <ReactMarkdown>
                        {itinerary}
                    </ReactMarkdown>
                </Box>
            )}
        </Paper>
    );
};

export default TourItinerary;
