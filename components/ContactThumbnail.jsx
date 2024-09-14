import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';

const ContactThumbnail = ({ avatar, name, phone }) => (
    <View style={styles.container}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginLeft: 20
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    phone: {
        fontSize: 16,
        color: 'white',
    },
});

export default ContactThumbnail;
