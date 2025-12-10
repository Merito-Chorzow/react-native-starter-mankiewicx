import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Zgoda na Lokalizację',
          message:
            'Aplikacja potrzebuje dostępu do GPS, by zapisać położenie notatki.',
          buttonNeutral: 'Zapytaj później',
          buttonNegative: 'Anuluj',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Lokalizacja: Zgoda udzielona');
        return true;
      } else {
        console.log('Lokalizacja: Zgoda odrzucona');
        return false;
      }
    } catch (err) {
      console.warn('Błąd prośby o uprawnienia: ', err);
      return false;
    }
  }
  return true;
};

export const getCurrentLocation = async () => {
  const hasPermission = await requestLocationPermission();

  if (!hasPermission) {
    throw new Error('Brak uprawnień do lokalizacji.');
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        let errorMessage = 'Nie udało się pobrać lokalizacji.';
        if (error.code === 1) {
          errorMessage = 'Brak zgody na użycie lokalizacji.';
        } else if (error.code === 2) {
          errorMessage = 'Pozycja niedostępna (np. brak GPS).';
        } else if (error.code === 3) {
          errorMessage = 'Przekroczono czas oczekiwania na lokalizację.';
        }
        reject(new Error(errorMessage));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  });
};
