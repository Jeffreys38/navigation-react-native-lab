import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View, Alert } from 'react-native';
import colors from "../utils/colors";

const ContactListItem = ({ name, avatar, phone, onPress, onEdit, onDelete }) => {

    const handleLongPress = () => {
        Alert.alert(
            'Options',
            'What would you like to do?',
            [
                {
                    text: 'Edit',
                    onPress: () => {
                        if (onEdit) onEdit();
                    },
                    style: 'default'
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        if (onDelete) onDelete();
                    },
                    style: 'destructive'
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={handleLongPress}
            style={styles.container}
        >
            <View style={styles.contactInfo}>
                <Image source={{ uri: avatar }} style={styles.avatar} />
                <View style={styles.details}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subtitle}>{phone}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: colors.greyDark,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    contactInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    details: {
        marginLeft: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
    },
});

export default ContactListItem;
