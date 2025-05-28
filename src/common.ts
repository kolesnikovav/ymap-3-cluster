import type { LngLatBounds, LngLat, Feature } from "ymaps3";

// Generating random coordinates of a point [lng, lat] in a given boundary
const getRandomPointCoordinates = (bounds: LngLatBounds): LngLat => {
  const lngRange = bounds[1][0] - bounds[0][0];
  const latRange = bounds[1][1] - bounds[0][1];
  return [
    bounds[0][0] + Math.random() * lngRange,
    bounds[1][1] + Math.random() * latRange
  ]
};

// A function that creates an array with parameters for each clusterer random point
export const getRandomPoints = (count: number, bounds: LngLatBounds): Feature[] => {
    return Array.from({length: count}, (_, index) => ({
        type: 'Feature',
        id: index.toString(),
        properties: {name: `Point ${index + 1}`, description: ''},
        geometry: {type: 'Point', coordinates: getRandomPointCoordinates(bounds)}
    }));
};