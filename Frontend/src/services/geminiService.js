import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// Function to generate tour itinerary using Gemini
export const generateTourItinerary = async (tourData) => {
    try {
        // Access the model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Format dates properly to avoid issues
        const startDate = tourData.startDate ? new Date(tourData.startDate).toLocaleDateString() : 'unspecified date';
        const endDate = tourData.endDate ? new Date(tourData.endDate).toLocaleDateString() : 'unspecified date';

        // Create a prompt based on the tour data
        const prompt = `
        Create a detailed travel itinerary for a trip to ${tourData.destination} 
        from ${startDate} to ${endDate}.
        ${tourData.budget ? `The budget for this trip is $${tourData.budget}.` : 'No specific budget constraints.'}
        ${tourData.additionalInfo ? `Additional preferences: ${tourData.additionalInfo}` : ''}
        
        Please include:
        1. Day-by-day itinerary with activities and attractions
        2. Transportation options with rough time estimates
        3. Suggested meal plans (breakfast, lunch, dinner) with local cuisine recommendations
        4. Accommodation options tailored to preferences (budget, mid-range, luxury)
        5. Estimated total cost of the trip with a breakdown (transportation, accommodation, food, activities)
        6. Local tips and cultural insights
        7. Packing suggestions based on the destination and time of year. 
        `;

        console.log("Sending prompt to Gemini:", prompt);

        // Generate content with proper error handling
        const result = await model.generateContent(prompt);
        
        if (!result || !result.response) {
            throw new Error("Received empty response from Gemini API");
        }
        
        const response = result.response;
        const text = response.text();
        
        if (!text || text.trim() === '') {
            throw new Error("Received empty text from Gemini API");
        }

        console.log("Successfully generated itinerary");
        return text;
    } catch (error) {
        console.error("Error generating tour itinerary:", error);
        
        // Provide more specific error messages based on the error type
        if (error.message.includes("API key")) {
            throw new Error("API key issue. Please check your Gemini API key configuration.");
        } else if (error.message.includes("quota")) {
            throw new Error("API quota exceeded. Please try again later.");
        } else if (error.message.includes("network")) {
            throw new Error("Network error. Please check your internet connection and try again.");
        } else {
            throw new Error("Failed to generate tour itinerary. Please try again with different details.");
        }
    }
};

// Function to save tour plan to the backend
export const saveTourPlan = async (tourData, itinerary) => {
    try {
        // For testing purposes, you can return a mock success response
        // Remove this when your backend is ready
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            console.log("Development mode: Mocking successful save");
            return { success: true, message: "Tour plan saved successfully (mock)" };
        }
        
        const response = await fetch('http://your-backend-url/api/tours', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tourDetails: tourData,
                itinerary: itinerary
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || 'Failed to save tour plan');
        }

        return await response.json();
    } catch (error) {
        console.error("Error saving tour plan:", error);
        throw error;
    }
};
