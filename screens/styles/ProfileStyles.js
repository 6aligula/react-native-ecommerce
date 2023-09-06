import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        //flex: 1,   // esto hace que el contenedor tome todo el espacio disponible
        //justifyContent: 'center', // esto centra los hijos en el eje vertical
        //alignItems: 'center', // esto centra los hijos en el eje horizontal
        //width: 300,
        margin: 20,
        fontFamily: 'Arial',
    },
    containerList: {
        flexDirection: 'row',
        margin: 10,
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
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10, // Añade margen izquierdo para separar el texto del ícono
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        margin: 5,
    },
    rowCell: {
        backgroundColor: '#E0E0E0',  
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#757575',
    },
    cell: {

        textAlign: 'center',
        color: '#34495e',
    },
    headerCell: {

        textAlign: 'center',
        color: '#34495e',
        fontSize: 18,
    },
    cellID: {
        flex: 0.10,  // 15% del ancho
    },
    cellFecha: {
        flex: 0.25,  // 25% del ancho
    },
    cellTotal: {
        flex: 0.2,  // 20% del ancho
    },
    cellPagado: {
        flex: 0.25,  // 20% del ancho
    },
    cellEnviado: {
        flex: 0.2,  // 20% del ancho
    },
    // detailsButton: {
    //     backgroundColor: '#007BFF',
    //     paddingHorizontal: 10,
    //     paddingVertical: 5,
    //     borderRadius: 5,
    // },

});

export default styles;