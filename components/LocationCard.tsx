import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MapPin, RefreshCw } from 'lucide-react-native';

interface LocationInfo {
  latitude: number;
  longitude: number;
  address: string;
}

interface LocationCardProps {
  location: LocationInfo | null;
  onRefresh: () => void;
  loading: boolean;
}

export function LocationCard({ location, onRefresh, loading }: LocationCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationInfo}>
          <MapPin size={20} color="#FF6B35" />
          <Text style={styles.title}>Your Location</Text>
        </View>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={onRefresh}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FF6B35" />
          ) : (
            <RefreshCw size={18} color="#FF6B35" />
          )}
        </TouchableOpacity>
      </View>

      {location ? (
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{location.address}</Text>
          <Text style={styles.coordinates}>
            {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </Text>
        </View>
      ) : (
        <Text style={styles.noLocation}>Location not available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
  },
  refreshButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FEF3F2',
  },
  addressContainer: {
    paddingLeft: 28,
  },
  address: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 4,
    fontWeight: '500',
  },
  coordinates: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  noLocation: {
    fontSize: 16,
    color: '#9CA3AF',
    fontStyle: 'italic',
    paddingLeft: 28,
  },
});