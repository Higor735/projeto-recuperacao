import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const UserFormScreen = ({ route, navigation }) => {
  const { userId } = route.params || {}; // Receber o ID do usuário (se existir)
  const isEditMode = !!userId; // Verifica se está no modo de edição

  const [userType, setUserType] = useState('motorista');
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accessTime, setAccessTime] = useState('6');
  const [address, setAddress] = useState({
    cep: '',
    street: '',
    neighborhood: '',
    number: '',
    complement: '',
    state: '',
    city: '',
  });

  // Carregar os dados do usuário se estiver no modo de edição
  useEffect(() => {
    if (isEditMode) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://api.example.com/users/${userId}`);
      const userData = response.data;

      setUserType(userData.type);
      setName(userData.name);
      setDocument(userData.document);
      setEmail(userData.email);
      setAccessTime(userData.accessTime);
      setAddress(userData.address || {});
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || (!isEditMode && !password) || address.cep === '') {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios!');
      return;
    }
    if (!isEditMode && password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não conferem!');
      return;
    }

    const payload = {
      type: userType,
      name,
      document,
      email,
      password: isEditMode ? undefined : password, // Apenas envie senha no cadastro
      accessTime,
      address,
    };

    try {
      if (isEditMode) {
        // Requisição PUT para editar usuário
        await axios.put(`https://api.example.com/users/${userId}`, payload);
        Alert.alert('Sucesso', 'Usuário editado com sucesso!');
      } else {
        // Requisição POST para criar usuário
        await axios.post('https://api.example.com/users', payload);
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar o usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Usuário</Text>
      <Picker selectedValue={userType} onValueChange={(value) => setUserType(value)} style={styles.picker}>
        <Picker.Item label="Motorista" value="motorista" />
        <Picker.Item label="Filial" value="filial" />
      </Picker>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput style={styles.input} placeholder="Digite o nome completo" value={name} onChangeText={setName} />

      <Text style={styles.label}>Documento</Text>
      <TextInput
        style={styles.input}
        placeholder={userType === 'motorista' ? 'XXX.XXX.XXX-XX' : 'XX.XXX.XXX/XXXX-XX'}
        value={document}
        onChangeText={setDocument}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Digite o email" keyboardType="email-address" value={email} onChangeText={setEmail} />

      {!isEditMode && (
        <>
          <Text style={styles.label}>Senha</Text>
          <TextInput style={styles.input} placeholder="Digite a senha" secureTextEntry value={password} onChangeText={setPassword} />

          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme a senha"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </>
      )}

      <Text style={styles.label}>Tempo de Acesso</Text>
      <Picker selectedValue={accessTime} onValueChange={(value) => setAccessTime(value)} style={styles.picker}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <Picker.Item key={month} label={`${month} meses`} value={`${month}`} />
        ))}
      </Picker>

      <Text style={styles.label}>Endereço</Text>
      <TextInput style={styles.input} placeholder="CEP" value={address.cep} onChangeText={(value) => setAddress({ ...address, cep: value })} />
      <TextInput style={styles.input} placeholder="Rua" value={address.street} onChangeText={(value) => setAddress({ ...address, street: value })} />
      <TextInput
        style={styles.input}
        placeholder="Bairro"
        value={address.neighborhood}
        onChangeText={(value) => setAddress({ ...address, neighborhood: value })}
      />
      <TextInput style={styles.input} placeholder="Número" value={address.number} onChangeText={(value) => setAddress({ ...address, number: value })} />
      <TextInput
        style={styles.input}
        placeholder="Complemento"
        value={address.complement}
        onChangeText={(value) => setAddress({ ...address, complement: value })}
      />
      <TextInput style={styles.input} placeholder="Estado" value={address.state} onChangeText={(value) => setAddress({ ...address, state: value })} />
      <TextInput style={styles.input} placeholder="Cidade" value={address.city} onChangeText={(value) => setAddress({ ...address, city: value })} />

      <Button title={isEditMode ? 'Salvar Alterações' : 'Cadastrar Usuário'} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { marginBottom: 8, fontSize: 16, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 16 },
  picker: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 16 },
});

export default UserFormScreen;
