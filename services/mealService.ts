interface LocationInfo {
  latitude: number;
  longitude: number;
  address: string;
}

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  distance: string;
  estimatedTime: string;
  image: string;
  priceRange: string;
}

// Mock restaurant data
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Warung Bu Kris',
    cuisine: 'Indonesian • Traditional',
    rating: 4.5,
    distance: '0.2 km',
    estimatedTime: '15 min',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    priceRange: '$',
  },
  {
    id: '2',
    name: 'Dim Sum Paradise',
    cuisine: 'Chinese • Dim Sum',
    rating: 4.3,
    distance: '0.5 km',
    estimatedTime: '20 min',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    priceRange: '$$',
  },
  {
    id: '3',
    name: 'Burger Junction',
    cuisine: 'Western • Fast Food',
    rating: 4.1,
    distance: '0.8 km',
    estimatedTime: '25 min',
    image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=400',
    priceRange: '$$',
  },
  {
    id: '4',
    name: 'Sushi Zen',
    cuisine: 'Japanese • Sushi',
    rating: 4.7,
    distance: '1.2 km',
    estimatedTime: '30 min',
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400',
    priceRange: '$$$',
  },
  {
    id: '5',
    name: 'Spice Garden',
    cuisine: 'Thai • Spicy',
    rating: 4.4,
    distance: '0.7 km',
    estimatedTime: '22 min',
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
    priceRange: '$$',
  },
  {
    id: '6',
    name: 'Curry House',
    cuisine: 'Indian • Curry',
    rating: 4.2,
    distance: '1.5 km',
    estimatedTime: '35 min',
    image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=400',
    priceRange: '$$',
  },
];

export function getMealSuggestions(location: LocationInfo): Restaurant[] {
  // In a real app, this would make an API call to get restaurants near the location
  // For now, we'll return shuffled mock data to simulate location-based results
  const shuffled = [...mockRestaurants].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4); // Return 4 random restaurants
}

export function searchRestaurants(query: string, location?: LocationInfo): Restaurant[] {
  if (!query.trim()) {
    return mockRestaurants;
  }
  
  return mockRestaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
  );
}

export function getRestaurantsByCategory(category: string): Restaurant[] {
  return mockRestaurants.filter((restaurant) =>
    restaurant.cuisine.toLowerCase().includes(category.toLowerCase())
  );
}