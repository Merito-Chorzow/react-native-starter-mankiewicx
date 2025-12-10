import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getCurrentLocation } from '../services/geolocationService';
import { addNote } from '../api/notesApi';

const NoteFormScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGetLocation = async () => {
    setIsLocating(true);
    setLocation(null);
    try {
      const loc = await getCurrentLocation();
      setLocation(loc);
      Alert.alert(
        'Sukces!',
        `Lokalizacja pobrana: ${loc.latitude.toFixed(
          4,
        )}, ${loc.longitude.toFixed(4)}`,
      );
    } catch (error) {
      Alert.alert('Błąd GPS', error.message);
      console.error(error);
    } finally {
      setIsLocating(false);
    }
  };

  const handleSaveNote = async () => {
    if (!title || !description) {
      Alert.alert('Błąd', 'Tytuł i opis są wymagane.');
      return;
    }

    setIsSaving(true);
    try {
      const newNote = {
        title,
        description,
        location,
        date: new Date().toISOString(),
      };

      await addNote(newNote);

      Alert.alert('Sukces', 'Notatka została zapisana.');

      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Błąd Zapisywania',
        'Nie udało się zapisać notatki. Spróbuj ponownie.',
      );
    } finally {
      setIsSaving(false);
    }
  };
  const locationButtonContainerStyle = [
    styles.locationButtonContainer,
    { minHeight: 48 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tytuł Notatki:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Krótki tytuł"
        accessibilityLabel="Pole tekstowe tytułu notatki"
      />

      <Text style={styles.label}>Opis:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Szczegółowy opis..."
        multiline
        accessibilityLabel="Pole tekstowe opisu notatki"
      />

      <View style={locationButtonContainerStyle}>
        <Button
          title={
            isLocating ? 'Pobieranie...' : 'Pobierz Aktualną Lokalizację GPS'
          }
          onPress={handleGetLocation}
          disabled={isLocating}
        />
      </View>

      {location && (
        <Text style={styles.locationText}>
          📍 Lokalizacja: {location.latitude.toFixed(4)},{' '}
          {location.longitude.toFixed(4)}
        </Text>
      )}

      <View style={styles.saveButtonContainer}>
        <Button
          title={isSaving ? 'Zapisywanie...' : 'Zapisz Notatkę'}
          onPress={handleSaveNote}
          color="#1E90FF"
          disabled={isSaving || isLocating}
        />
        {isSaving && <ActivityIndicator size="small" color="#1E90FF" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  locationButtonContainer: {
    marginVertical: 10,
  },
  locationText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  saveButtonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NoteFormScreen;
