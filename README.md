# RealtyMate - Real Estate Agency Application

## RealtyMate is a frontend application for a real estate agency using React, Chakra UI, Swiper, and Axios. This application allows users to explore real estate properties through an interactive map provided by Google Maps and property data fetched from the Bayut API. The project is structured to be integrated with a backend built in Laravel.

## Features

- **Property Search**: Search properties for sale and rent using the Bayut API.
- **Map View**: View properties on the map using Google Maps.
- **Mortgage Calculator**: Calculate mortgage payments for selected properties.
- **Testimonials**: Read reviews from satisfied clients.
- **Responsiveness**: Layout optimized for mobile, tablet, and desktop devices.

## Technologies Used

- **UI Framework**: Chakra UI, Swiper
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Testing**: Vitest, Testing Library React
- **External APIs**: Google Maps, Bayut

## Project Structure

- **src/assets**: Contains CSS files and Chakra UI themes.
  - **css/app.css**: Global styles of the application.
- **src/components**: Contains all the React components used in the application.
  - **common**: Common components like Navbar and Footer.
    - **footer**: Contains footer-related components.
  - **pages**: Contains the main pages like Home, About, Properties, Contact, Pricing.
  - **partners**: Contains partner-related components.
  - **price**: Contains price-related components.
  - **property**: Contains property-related components.
  - **team**: Contains team-related components.
  - **testimonials**: Contains testimonial-related components.
- **src/constants**: Contains constants used in the application.
- **src/context**: Contains React context for global state management.
- **src/data**: Contains mock data used for testing.
  - **properties.json**: List of properties.
  - **property.json**: Details about each property.
- **src/hooks**: Contains custom React hooks.
  - **useIsDesktop.js**: Hook to determine if the device is desktop.
  - **usePropertyFormat.js**: Hook to format property data.
- **src/tests**: Contains tests for components and pages.
- **src/utils**: Contains utility functions like fetchApi.js for API calls.

## Installation and Setup

1. **Clone the repository:**
  ```bash
  git clone https://github.com/your-username/realtymate.git
  cd realtymate
  ```

2. **Install dependencies:**
  ```bash
  npm install
  ```

3. **Set up environment variables:**
  Create a `.env` file at the root of the project and add the following variables:
  ```bash
  VITE_RAPIDAPI_KEY=your-rapidapi-key
  VITE_GOOGLE_MAP_API_KEY=your-google-map-api-key
  VITE_USE_MOCK_DATA=true
  ```

4. **Start the application:**
  ```bash
  npm run dev
  ```

5. **Testing Tools:**
  The application uses Vitest for testing. You can run the tests with the command:
  ```bash
  npm run test
  ```

  For an interactive test UI:
  ```bash
  npm run test:ui
  ```
