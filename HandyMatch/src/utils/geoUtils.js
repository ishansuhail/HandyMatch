export const haversineDistance = (coord1, coord2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lon - coord1.lon);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
};

const coordinateCache = {};

export const fetchCoordinates = async (zipCode) => {
  try {
    if (!zipCode || zipCode.trim() === "") {
      throw new Error(`Invalid zip code: "${zipCode}"`); // Handle empty or invalid zip codes
    }

    console.log("Fetching coordinates for zip code:", zipCode);
    if (coordinateCache[zipCode]) {
      return coordinateCache[zipCode];
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.results && data.results[0]) {
      const coordinates = {
        lat: data.results[0].geometry.location.lat,
        lon: data.results[0].geometry.location.lng,
      };
      coordinateCache[zipCode] = coordinates; // Cache the result
      return coordinates;
    } else {
      throw new Error(
        `Failed to fetch coordinates for zip code: "${zipCode}". API response: ${JSON.stringify(
          data
        )}`
      );
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error; // Propagate error for sorting logic to handle
  }
};
