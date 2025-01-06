import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function UserFormScreen() {
  const [userType, setUserType] = useState('motorista');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accessTime, setAccessTime] = useState('6');
  const [document, setDocument] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Usuário</Text>
      <Picker
        selectedValue={userType}
        onValueChange={(value) => setUserType(value)}
        style={styles.picker}
      >
        <Picker.Item label="Motorista" value="motorista" />
        <Picker.Item label="Filial" value="filial" />
      </Picker>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite o nome completo"
      />

      <Text style={styles.label}>Documento</Text>
      <TextInput
        style={styles.input}
        value={document}
        onChangeText={setDocument}
        placeholder={
          userType === 'motorista'
            ? 'Formato: XXX.XXX.XXX-XX'
            : 'Formato: XX.XXX.XXX/XXXX-XX'
        }
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite o email"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Digite a senha"
        secureTextEntry
      />

      <Text style={styles.label}>Confirmar Senha</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirme a senha"
        secureTextEntry
      />

      <Text style={styles.label}>Tempo de Acesso</Text>
      <Picker
        selectedValue={accessTime}
        onValueChange={(value) => setAccessTime(value)}
        style={styles.picker}
      >
        {[...Array(12)].map((_, index) => (
          <Picker.Item
            key={index}
            label={`${index + 1} mês(es)`}
            value={(index + 1).toString()}
          />
        ))}
      </Picker>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
