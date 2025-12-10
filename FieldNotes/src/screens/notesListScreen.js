import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { getNotes } from '../api/notesApi';
import { useFocusEffect } from '@react-navigation/native';
import NoteItem from '../components/noteItem';

const NotesListScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      console.error('Błąd pobierania notatek:', err);
      setError('Nie udało się załadować notatek. Sprawdź połączenie.');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('NoteForm')}
            style={styles.addButton}
            accessibilityLabel="Dodaj nową notatkę"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        ),
      });
    }, [navigation]),
  );

  const renderItem = ({ item }) => (
    <NoteItem
      note={item}
      onPress={() => navigation.navigate('NoteDetail', { note: item })}
    />
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text>Ładowanie notatek...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>🚨 {error}</Text>
        <Button title="Spróbuj ponownie" onPress={fetchNotes} />
      </View>
    );
  }

  if (notes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Brak notatek. Dodaj pierwszą!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={notes}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  addButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 28,
    color: '#f3f4f6ff',
    fontWeight: '300',
  },
});

export default NotesListScreen;
