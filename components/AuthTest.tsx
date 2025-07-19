import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSupabaseAuth } from '@/hooks';

export function AuthTest() {
  const { signIn, signUp, signOut, user, loading } = useSupabaseAuth();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');

  const handleSignUp = async () => {
    const { error } = await signUp(email, password);
    if (error) {
      Alert.alert('Sign Up Error', error.message);
    } else {
      Alert.alert('Success', 'Check your email for confirmation!');
    }
  };

  const handleSignIn = async () => {
    const { error } = await signIn(email, password);
    if (error) {
      Alert.alert('Sign In Error', error.message);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      Alert.alert('Sign Out Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supabase Auth Test</Text>
      
      {user ? (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>Logged in as: {user.email}</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSignOut}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Signing Out...' : 'Sign Out'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.authForm}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.signUpButton]} 
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.signInButton]} 
              onPress={handleSignIn}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  userInfo: {
    alignItems: 'center',
  },
  userText: {
    fontSize: 16,
    color: '#10B981',
    marginBottom: 12,
  },
  authForm: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#3B82F6',
  },
  signInButton: {
    backgroundColor: '#10B981',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 