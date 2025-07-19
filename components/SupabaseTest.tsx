import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { supabase } from '@/lib/supabase-minimal';

export function SupabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error'>('testing');
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      // Test basic connection
      const { data, error } = await supabase
        .from('profiles')
        .select('count', { count: 'exact', head: true });

      if (error) {
        console.error('Supabase connection error:', error);
        setConnectionStatus('error');
        Alert.alert('Connection Error', 'Failed to connect to Supabase');
        return;
      }

      setConnectionStatus('connected');
      setUserCount(data?.[0]?.count || 0);
      console.log('✅ Supabase connection successful!');
    } catch (error) {
      console.error('Supabase test error:', error);
      setConnectionStatus('error');
      Alert.alert('Connection Error', 'Failed to connect to Supabase');
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return '#10B981'; // Green
      case 'error':
        return '#EF4444'; // Red
      default:
        return '#F59E0B'; // Yellow
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected to Supabase';
      case 'error':
        return 'Connection Failed';
      default:
        return 'Testing Connection...';
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
      <Text style={styles.statusText}>{getStatusText()}</Text>
      {connectionStatus === 'connected' && (
        <Text style={styles.detailsText}>
          Project: qdirlasdpsdgwoypgnri.supabase.co
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    margin: 16,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  detailsText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
}); 