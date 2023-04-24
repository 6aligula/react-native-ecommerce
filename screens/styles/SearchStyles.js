import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backButton: {
        marginLeft: 10,
        padding: 8,
        borderRadius: 50,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5, // Añadido el padding
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    productList: {
        justifyContent: 'space-between', // Añadido
    },
});
export default styles;