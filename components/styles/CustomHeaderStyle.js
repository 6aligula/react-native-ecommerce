import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Cambiado a 'space-between'
        height: 60,
        backgroundColor: '#333',
        paddingHorizontal: 10, // Añadido para dar un margen a ambos lados
    },
    backButton: {
        paddingRight: 10, // Cambiado a paddingRight para que el botón tenga margen interno a la derecha
    },
    logo: {
        width: '20%',
        height: '80%',
        resizeMode: 'contain',
    },
    rightButtons: {
        flexDirection: 'row', // Añadido para que los íconos estén en fila
    },
    loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10, // Añadido para separar los íconos
    },
    cartButton: {
        paddingLeft: 10, // Cambiado a paddingLeft para que el botón tenga margen interno a la izquierda
    },
    cartItemCountContainer: {
        position: 'absolute',
        top: -5,
        right: -10,
        backgroundColor: 'red',
        borderRadius: 15,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartItemCount: {
        color: 'white',
        fontWeight: 'bold',
    },
    usernameText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 16,
    },
});

export default styles;
