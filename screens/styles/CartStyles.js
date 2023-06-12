import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#2c3e50',
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#27ae60',
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    roundedButton: {
        backgroundColor: '#007BFF', // Color de fondo del botón (puedes cambiarlo a tu preferencia)
        borderRadius: 25, // Añade bordes redondeados
        overflow: 'hidden', // Oculta el contenido que sobresale de los bordes redondeados
    },
    quantityLabel: {
        // ... Otros estilos
        marginBottom: 1, // Añade un margen inferior más pequeño
    },

    quantityPicker: {
        // ... Otros estilos
        marginTop: -25, // Añade un margen superior negativo para acercar el Picker al texto
    },


});
export default styles;