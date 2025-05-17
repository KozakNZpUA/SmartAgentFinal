import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [serverUrl, setServerUrl] = useState('http://192.168.0.100:8000/api/query');

  const sendQuery = async () => {
    try {
      const res = await fetch(serverUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResponse(JSON.stringify(data.result, null, 2));
    } catch (err) {
      setResponse('Ошибка: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartAgent</Text>
      <TextInput
        style={styles.input}
        placeholder="Введите запрос"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Отправить" onPress={sendQuery} />
      <ScrollView style={styles.outputBox}>
        <Text style={styles.output}>{response}</Text>
      </ScrollView>
      <TextInput
        style={styles.serverInput}
        placeholder="Адрес сервера"
        value={serverUrl}
        onChangeText={setServerUrl}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  outputBox: {
    flex: 1,
    marginTop: 20,
  },
  output: {
    fontSize: 16,
  },
  serverInput: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    fontSize: 12,
    color: 'gray',
  },
});