import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        margin: 20,
        fontFamily: 'Arial',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        marginBottom: 16
    },
    input: {
        fontWeight: 'bold',
        color: '#27ae60',
        borderColor: 'grey',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10
    },
    inputField: {
        marginBottom: 10,
        width: '100%',
    },
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButton: {
        flexDirection: 'row', // Agregar dirección de fila para que el ícono y el texto estén en línea horizontal
        width: 80, // Aumentar el ancho según tus necesidades debido al ícono adicional
        height: 50,
        backgroundColor: 'gray',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 10, // Añade padding para dar espacio alrededor del ícono y el texto
    },
    myOrdersButton: {
        flexDirection: 'row', // Agregar dirección de fila para que el ícono y el texto estén en línea horizontal
        width: 100, // Aumentar el ancho según tus necesidades debido al ícono adicional
        height: 60,
        backgroundColor: 'gray',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        padding: 10, // Añade padding para dar espacio alrededor del ícono y el texto
    },
    buttonsContainer: {
        flexDirection: 'row', // Define una dirección de fila para los hijos
        justifyContent: 'space-between', // Distribuye el espacio entre los botones
        alignItems: 'center', // Alinea los botones verticalmente en el centro
        marginBottom: 20, // Añade un margen inferior para separar de otros elementos
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10, // Añade margen izquierdo para separar el texto del ícono
    },
});

export default styles;