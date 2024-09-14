import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';
import colors from '../utils/colors';

const Profile = ({ route }) => {
    const { contact } = route.params;
    const { avatar, name, email, phone, cell } = contact;

    const handleCall = () => {
        Linking.openURL(`tel:${phone}`);
    };

    const handleMessage = () => {
        Linking.openURL(`sms:${phone}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.avatarSection}>
                <ContactThumbnail avatar={avatar} name={name} phone={phone} />
            </View>
            <View style={styles.detailSection}>
                <DetailListItem icon="mail" title="Email" subtitle={email} />
                <DetailListItem icon="phone" title="Work" subtitle={phone} />
                <DetailListItem icon="smartphone" title="Personal" subtitle={cell} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
                    <Icon name="message" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                    <Icon name="phone" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
    },
    detailSection: {
        flex: 1,
        backgroundColor: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    messageButton: {
        backgroundColor: '#4CAF50', // Green color for messaging
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    callButton: {
        backgroundColor: '#F44336', // Red color for calling
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Profile;
