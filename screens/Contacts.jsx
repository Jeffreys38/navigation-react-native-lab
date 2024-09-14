import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError, deleteContact, editContact } from '../store';
import { fetchContacts } from '../utils/api';
import {
    View,
    Text,
    ActivityIndicator,
    SafeAreaView,
    TouchableOpacity,
    SectionList,
    ScrollView,
    Dimensions,
    StyleSheet,
    Alert,
} from 'react-native';
import ContactListItem from '../components/ContactListItem';

const Contacts = ({ navigation }) => {
    const { contacts, loading, error } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [selectedLetter, setSelectedLetter] = useState(null);
    const sectionListRef = useRef(null);

    useEffect(() => {
        dispatch(fetchContactsLoading());
        fetchContacts()
            .then((contacts) => dispatch(fetchContactsSuccess(contacts)))
            .catch(() => dispatch(fetchContactsError()));
    }, []);

    const contactsGrouped = contacts.reduce((acc, contact) => {
        const firstLetter = contact.name[0].toUpperCase();
        if (!acc[firstLetter]) acc[firstLetter] = [];
        acc[firstLetter].push(contact);
        return acc;
    }, {});

    const sections = Object.keys(contactsGrouped).sort().map(letter => ({
        title: letter,
        data: contactsGrouped[letter]
    }));

    const handleDelete = (phone) => {
        Alert.alert(
            'Delete Contact',
            'Are you sure you want to delete this contact?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => dispatch(deleteContact(phone)),
                    style: 'destructive',
                },
            ]
        );
    };

    const handleEdit = (contact) => {
        Alert.prompt(
            'Edit Contact',
            'Enter new name',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Next',
                    onPress: (newName) => {
                        if (newName) {
                            Alert.prompt(
                                'Edit Phone Number',
                                'Enter new phone number',
                                [
                                    {
                                        text: 'Cancel',
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'OK',
                                        onPress: (newPhone) => {
                                            if (newPhone) {
                                                dispatch(editContact({
                                                    phone: contact.phone,
                                                    updatedContact: {
                                                        name: newName,
                                                        phone: newPhone
                                                    }
                                                }));
                                            }
                                        },
                                    },
                                ],
                                'plain-text',
                                contact.phone
                            );
                        }
                    },
                },
            ],
            'plain-text',
            contact.name
        );
    };

    const renderContact = ({ item }) => (
        <ContactListItem
            name={item.name}
            avatar={item.avatar}
            phone={item.phone}
            onPress={() => navigation.navigate('Profile', { contact: item })}
            onEdit={() => handleEdit(item)} // Optional: Implement handleEdit if needed
            onDelete={() => handleDelete(item.phone)}
        />
    );

    const renderHeader = ({ section: { title } }) => (
        <View style={{ padding: 10, backgroundColor: '#f4f4f4' }}>
            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        </View>
    );

    const handleLetterPress = (letter) => {
        setSelectedLetter(letter);
        const index = sections.findIndex(section => section.title === letter);
        if (index !== -1 && sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
                sectionIndex: index,
                itemIndex: 1,
                animated: true,
                viewPosition: 0,
                viewOffset: 50,
            });
        }
    };

    const renderAlphabetSidebar = () => {
        const screenHeight = Dimensions.get("window").height;
        const sidebarHeight = screenHeight / 1.6;

        return (
            <View style={styles.sidebarContainer}>
                <ScrollView style={[styles.scrollView, { height: sidebarHeight }]}>
                    {Object.keys(contactsGrouped).sort().map(letter => (
                        <TouchableOpacity key={letter} onPress={() => handleLetterPress(letter)}>
                            <Text style={styles.letter}>{letter}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    };

    if (loading) return <ActivityIndicator color={"black"} size="large" />;
    if (error) return <Text>Error loading contacts</Text>;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SectionList
                ref={sectionListRef}
                sections={sections}
                renderItem={renderContact}
                renderSectionHeader={renderHeader}
                keyExtractor={(item) => item.phone}
                stickySectionHeadersEnabled={true}
            />
            {renderAlphabetSidebar()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sidebarContainer: {
        position: 'absolute',
        right: 10,
        top: '40%',
        transform: [{ translateY: -Dimensions.get('window').height / 4 }],
        backgroundColor: 'black',
        borderRadius: 30,
        alignItems: 'center',
    },
    scrollView: {
        width: 50,
        alignItems: 'center',
        flexDirection: 'column'
    },
    letter: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Contacts;
