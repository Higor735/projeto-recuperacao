import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Módulo de Usuários</Text>
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.logo} />
      <TouchableOpacity
        onLongPress={() => navigation.navigate('UserList')}
        style={styles.fingerprintContainer}
      >
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.fingerprint} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  fingerprintContainer: {
    padding: 20,
    backgroundColor: '#ddd',
    borderRadius: 50,
  },
  fingerprint: {
    width: 100,
    height: 100,
  },
});
