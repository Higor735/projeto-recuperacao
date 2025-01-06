import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function UserListScreen({ navigation }: any) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const renderUser = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('UserDetails', { userId: item.id })}>
        <Text style={styles.button}>Visualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.button}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.button}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item: any) => item.id.toString()}
      />
      <TouchableOpacity onPress={() => navigation.navigate('UserForm')} style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    color: '#007bff',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
