import React, { useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } from '../store';
import { fetchContacts } from '../utils/api';
import ContactThumbnail from '../components/ContactThumbnail';

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
    const { contacts, loading, error } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContactsLoading());
        fetchContacts()
            .then((contacts) => dispatch(fetchContactsSuccess(contacts)))
            .catch(() => dispatch(fetchContactsError()));
    }, []);

    const renderFavoriteThumbnail = ({ item }) => (
        <ContactThumbnail
            avatar={item.avatar}
            onPress={() => navigation.navigate('Profile', { contact: item })}
        />
    );

    const favorites = contacts.filter(contact => contact.favorite);

    if (loading) return <ActivityIndicator color={"black"}  size="large" />;
    if (error) return <Text>Error loading contacts...</Text>;

    return (
        <SafeAreaView style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
                <FlatList
                    style={{width: '100%'}}
                    data={favorites}
                    keyExtractor={keyExtractor}
                    numColumns={3}
                    contentContainerStyle={styles.list}
                    renderItem={renderFavoriteThumbnail}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        flexWrap: "wrap"
    },
    list: {
        alignItems: 'center',
    },
});

export default Favorites;
