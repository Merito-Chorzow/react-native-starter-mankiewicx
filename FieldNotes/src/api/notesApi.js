let mockNotes = [
  {
    id: '1',
    title: 'Wizyta w Krakowie',
    description: 'Rynek Główny, piękny dzień!',
    date: new Date(2025, 10, 20).toISOString(),
    location: {
      latitude: 50.0647,
      longitude: 19.945,
    },
  },
];

export const getNotes = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockNotes);
    }, 500);
  });
};

export const addNote = async newNote => {
  return new Promise(resolve => {
    setTimeout(() => {
      const noteWithId = { ...newNote, id: String(Date.now()) };
      mockNotes.unshift(noteWithId);
      resolve(noteWithId);
    }, 500);
  });
};
