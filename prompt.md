Implement a weather dashboard all in English within your existing frontend and backend.

Users should be able to enter a city name and view the current weather.

Use the Open-Meteo API to retrieve data (it is free and does not require an API key):

- Geocoding API: https://geocoding-api.open-meteo.com/v1/search (to convert a city name into coordinates)
- Weather API: https://api.open-meteo.com/v1/forecast (to fetch weather data)

The frontend must fetch data exclusively from the backend. Optionally, the frontend can attempt to detect the user's location via the browser (geolocation) and automatically suggest a city.

Create an endpoint on the backend for the frontend to consume, and display the retrieved data on the dashboard.