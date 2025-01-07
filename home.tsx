import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handlePressAndHold = () => {
    setTimeout(() => {
      navigation.navigate('UserList'); // Navega para a tela de listagem
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Logo da Empresa</Text>
      <Text style={styles.module}>Módulo de Usuários</Text>
      <TouchableOpacity
        onLongPress={handlePressAndHold}
        style={styles.fingerprintContainer}
      >
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Imagem de digital
          style={styles.fingerprint}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  module: { fontSize: 18, marginBottom: 32 },
  fingerprintContainer: { padding: 16, borderRadius: 8 },
  fingerprint: { width: 150, height: 150 },
});

export default HomeScreen;
