import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const NoteItem = ({ note, onPress }) => {
  const formattedDate = new Date(note.date).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const locationIndicator = note.location;

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Notatka: ${note.title}, z dnia ${formattedDate}`}
    >
      <Text style={styles.indicator}>{locationIndicator}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {note.title}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 48,
  },
  indicator: {
    fontSize: 24,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
});

export default NoteItem;
