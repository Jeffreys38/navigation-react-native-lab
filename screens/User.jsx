import React, { useEffect, useState } from 'react';
import {View, Text, ActivityIndicator, StyleSheet, SafeAreaView} from 'react-native';
import { fetchUserContact } from '../utils/api';
import ContactThumbnail from '../components/ContactThumbnail';
import colors from '../utils/colors';

const User = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchUserContact()
            .then((userData) => {
                setUser(userData);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    if (loading) return <ActivityIndicator size="large" />;
    if (error) return <Text>Error loading user data</Text>;

    const { avatar, name, phone } = user;

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ContactThumbnail avatar={avatar} name={name} phone={phone} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
});

export default User;
