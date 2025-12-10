# Field Notes: Dziennik Terenowy

Aplikacja mobilna stworzona w **ReactNative**, pozwalająca na dodawanie wpisów dziennika z wykorzystaniem **natywnej funkcji lokalizacji GPS** oraz komunikacji z **REST API**. Projekt spełnia wszystkie formalne wymagania zadania.

---

## Funkcje aplikacji

### Natywne funkcje

Aplikacja korzysta z jednej kluczowej natywnej funkcji urządzenia:

- **Lokalizacja GPS** (@react-native-community/geolocation) — Pobieranie i zapisywanie precyzyjnych współrzędnych bieżącej lokalizacji użytkownika w momencie tworzenia wpisu.

### Komunikacja z API (MockAPI)

Aplikacja symuluje połączenie z REST API (wewnętrzny Mock API w src/api/notesApi.js):

- **GET** → pobieranie listy wpisów (`getNotes`).
- **POST** → dodawanie nowego wpisu (`addNote`).

---

## Widoki aplikacji

### 1. Lista notatek

Główny ekran aplikacji:

- Wyświetlanie: lista wszystkich notatek pobieranych z API.
- Elementy: Tytuł, data utworzenia oraz lokalizacja, jeśli notatka ma zapisane współrzędne.

### 2. Dodawanie notatki

Ekran formularza do tworzenia nowych wpisów:

- Pola: Tytuł i Opis.
- Akcja Natywna: Przycisk "Pobierz Aktualną Lokalizację GPS".
- Zapis: Przesłanie notatki do API (POST).

### 3. Szczegóły notatki — _EntryDetailsScreen_

Wyświetla pełne dane wybranego wpisu:

- Opis: Pełna treść notatki.
- Pozycja GPS: Wyświetlenie zapisanych współrzędnych (Latitude i Longitude).

---

## Wykorzystane technologie

- React Native / JavaScript
- React Navigation (Stack)
- @react-native-community/geolocation (GPS)
- Wewnętrzny Mock API (zapis/odczyt w pamięci)

---

## Uruchamianie i Scenariusz Testowy

## Wymagania

- Node.js, React Native CLI
- Emulator Androida/iOS (AVD Manager)
- JDK 17 (wymagane przez Gradle)

## Scenariusz Testowy

    1. Pokaż listę/API: Po uruchomieniu, lista powinna wyświetlić mockową notatkę testową (GET).
    2.Pokaż natywną funkcję (GPS): Przejdź do formularza (+), kliknij "Pobierz Aktualną Lokalizację GPS". Zaakceptuj uprawnienia i weryfikuj pobranie współrzędnych.
    3.Pokaż zapis/API: Zapisz notatkę (POST). Wróć do listy i sprawdź, czy nowa pozycja została dodana.

---

## Definition of Done (DoD) - Status

Potwierdzenie spełnienia formalnych wymagań zadania:

- [x] 3–4 kompletne widoki zgodne z opisem.
- [x] Użyta co najmniej **1 natywna funkcja**.
- [x] Integracja z **API** (co najmniej 1 żądanie).
- [x] Czytelny UI + podstawowa dostępność.
- [x] Aktualizacja `README.md` z opisem funkcji i sposobem testowania.
- [x] Min. 3 logiczne commity.
