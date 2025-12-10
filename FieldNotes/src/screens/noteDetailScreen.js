import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NoteDetailScreen = ({ route }) => {
  const { note } = route.params;

  const formattedDate = new Date(note.date).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const locationDisplay = note.location
    ? `Latitude: ${note.location.latitude.toFixed(
        6,
      )}\nLongitude: ${note.location.longitude.toFixed(6)}`
    : 'Brak zapisanej lokalizacji.';

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.date}>Data utworzenia: {formattedDate}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opis:</Text>
        <Text style={styles.description}>{note.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Lokalizacja (Pozycja GPS):</Text>
        <Text style={styles.locationText}>{locationDisplay}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E90FF',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  locationText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#555',
    whiteSpace: 'pre',
  },
});

export default NoteDetailScreen;
