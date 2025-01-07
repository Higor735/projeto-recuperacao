import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const UserDetailsScreen = ({ route }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://api.example.com/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Usuário</Text>
      <Text>Nome: {user.name}</Text>
      <Text>Tipo: {user.type}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Documento: {user.document}</Text>
      <Text>Tempo de Acesso: {user.accessTime} meses</Text>
      <Text>Endereço:</Text>
      <Text>{user.address.street}, {user.address.number}</Text>
      <Text>{user.address.neighborhood}, {user.address.city} - {user.address.state}</Text>
      <Text>CEP: {user.address.cep}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
});

export default UserDetailsScreen;
