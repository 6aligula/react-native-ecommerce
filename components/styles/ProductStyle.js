import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    row: {
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        margin: 5,
        width: (screenWidth / 2) - 10, // Restamos 10 para contar el margen
    },

    imageContainer: {
        width: (screenWidth / 2) - 10, // Restamos 10 para contar el margen
        height: 200,
        overflow: 'hidden',  // Para recortar cualquier exceso de la imagen
        borderTopLeftRadius: 4,  // Mantén tus bordes redondeados
        borderTopRightRadius: 4,  // Mantén tus bordes redondeados
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',  // Asegura que la imagen cubra completamente el contenedor
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        width: '100%',
    },

    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#27ae60',
    },
});

export default styles;