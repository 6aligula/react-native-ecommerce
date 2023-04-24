import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        backgroundColor: '#fff',
        maxWidth: '100%', // Añade el ancho máximo
    },
    image: {
        width: '100%',
        maxWidth: '100%',
        height: 200,
        resizeMode: 'contain',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    cardBody: {
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    rating: {
        fontSize: 14,
        marginBottom: 5,
        flexDirection: 'column', // Añade flexDirection en 'column'
        
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#27ae60',
    },
});

export default styles;
