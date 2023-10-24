import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/Navigation/Navigation';

export default function App() {
  return (
    <>
      <Navigation />
      <StatusBar style='dark' />
    </>
  );
}

