import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import { MapPin, Star, Clock, Navigation } from 'lucide-react-native';
import { LocationCard } from '@/components/LocationCard';
import { RestaurantCard } from '@/components/RestaurantCard';
import { WelcomeBanner } from '@/components/WelcomeBanner';
import { getMealSuggestions } from '@/services/mealService';
import { useScrollViewLayout, useHeaderLayout } from '@/hooks';

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

export default function HomeScreen() {
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  
  // Navigation layout hooks to prevent overlapping issues
  const scrollViewLayout = useScrollViewLayout();
  const headerLayout = useHeaderLayout();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to find restaurants near you.',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }
      getCurrentLocation();
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      setLocationLoading(true);
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const addressResult = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      const address = addressResult[0]
        ? `${addressResult[0].street || ''} ${addressResult[0].city || ''}`
        : 'Unknown location';

      const locationInfo = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        address: address.trim(),
      };

      setLocation(locationInfo);
      const suggestions = getMealSuggestions(locationInfo);
      setRestaurants(suggestions);
      setLocationLoading(false);
      setLoading(false);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Unable to get your current location.');
      setLocationLoading(false);
      setLoading(false);
    }
  };

  const refreshLocation = () => {
    setLoading(true);
    getCurrentLocation();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Finding your location...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, scrollViewLayout.scrollViewStyle]} 
      contentContainerStyle={scrollViewLayout.contentContainerStyle}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, headerLayout.headerContainerStyle]}>
        <View style={headerLayout.headerContentStyle}>
          <Text style={styles.title}>Makan Apa?</Text>
          <Text style={styles.subtitle}>Discover delicious meals nearby</Text>
        </View>
      </View>

      <LocationCard
        location={location}
        onRefresh={refreshLocation}
        loading={locationLoading}
      />

      <WelcomeBanner />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </View>

      <View style={{ height: scrollViewLayout.bottomSpacing }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  header: {
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  seeAll: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },

});