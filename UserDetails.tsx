import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function UserDetailsScreen({ route }: any) {
  const { userId } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${userId}`).then((response) => {
      setUser(response.data);
    });
  }, []);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>Tipo: {user.type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
});
