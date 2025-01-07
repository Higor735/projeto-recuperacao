import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import corrigido
import axios from 'axios';

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://api.example.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter((user) => {
    if (filter === 'motorista') return user.type === 'motorista';
    if (filter === 'filial') return user.type === 'filial';
    return true;
  });

  const renderUser = ({ item }) => (
    <View style={styles.card}>
      <Text>Nome: {item.name}</Text>
      <Text>Tipo: {item.type}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UserDetails', { userId: item.id })}
      >
        <Text style={styles.buttonText}>Visualizar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={filter}
        onValueChange={setFilter}
        style={styles.picker}
      >
        <Picker.Item label="Todos" value="all" />
        <Picker.Item label="Motorista" value="motorista" />
        <Picker.Item label="Filial" value="filial" />
      </Picker>
      <FlatList
        data={filteredUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Adicionar Usuário"
        onPress={() => navigation.navigate('UserForm')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  picker: { marginBottom: 16 },
  card: { padding: 16, marginBottom: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
  button: { padding: 8, backgroundColor: '#007BFF', borderRadius: 8, marginTop: 8 },
  buttonText: { color: '#fff', textAlign: 'center' },
});

export default UserListScreen;

