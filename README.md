# Contacts Navigation Lab
![](https://dianapps.com/blog/wp-content/uploads/2023/05/Bottom-nav-bar-react-native.png)
## Overview

The Contacts Management App is a mobile application designed to manage and view a list of contacts. It allows users to perform various actions, such as viewing contact details, editing contact information, and deleting contacts. The app is built using React Native and Redux Toolkit for state management.

## Features

- **Edit Contact**: Update the contact's name and phone number.
- **Delete Contact**: Remove a contact from the list.
- **Alphabet Sidebar**: Quickly navigate to a section of the contact list by selecting a letter.

## Technologies

- **React Native**: Framework for building native mobile applications using React.
- **Redux Toolkit**: Simplifies state management and provides a robust way to manage the state of the application.
- **React Navigation**: Library for handling navigation within the app.

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Jeffreys38/navigation-react-native-lab.git
    ```

2. **Navigate to Project Directory**:
    ```bash
    cd navigation-react-native-lab
    ```

3. **Install Dependencies**:
    ```bash
    npm install
    ```

4. **Start the Server**:
    ```bash
    npx expo start --no-dev --minify
    ```

## Usage

- **Viewing Contacts**: On the main screen, you can scroll through the list of contacts grouped by the first letter of their names.
- **Navigating to Contact Details**: Tap on a contact to view more details.
- **Editing Contacts**: Press and hold a contact item to reveal options to edit or delete the contact. Editing allows you to change both the name and phone number of the contact.
- **Deleting Contacts**: Press and hold a contact item and select the "Delete" option to remove the contact from the list.
- **Alphabet Sidebar**: Use the sidebar to jump to a specific section of the contact list quickly.

## Redux State Management

The app uses Redux Toolkit for managing the state of contacts. The following actions and reducers are provided:

- `fetchContactsLoading`: Indicates that contacts are being loaded.
- `fetchContactsSuccess`: Updates the contacts state with the fetched contacts.
- `fetchContactsError`: Handles errors that occur while fetching contacts.
- `editContact`: Updates an existing contact's details.
- `deleteContact`: Removes a contact from the list.
