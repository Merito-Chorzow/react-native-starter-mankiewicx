import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NotesListScreen from './src/screens/notesListScreen';
import NoteDetailScreen from './src/screens/noteDetailScreen';
import NoteFormScreen from './src/screens/noteFormScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="NotesList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1E90FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="NotesList"
          component={NotesListScreen}
          options={{ title: 'Moje Notatki Terenowe' }}
        />
        <Stack.Screen
          name="NoteDetail"
          component={NoteDetailScreen}
          options={{ title: 'Szczegóły Notatki' }}
        />
        <Stack.Screen
          name="NoteForm"
          component={NoteFormScreen}
          options={{ title: 'Dodaj Nową Notatkę' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
