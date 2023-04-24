import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles/MessageStyle';

const Message = ({ variant, children }) => {
    const backgroundColor = variant === 'danger' ? 'red' : 'green';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.text}>{children}</Text>
        </View>
    );
};
export default Message;
