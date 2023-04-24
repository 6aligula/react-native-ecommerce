import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import styles from './styles/LoaderStyle';

const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    )
}
export default Loader;
