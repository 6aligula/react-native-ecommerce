import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    addressSection: {
        marginVertical: 10,
    },
    addressTitle: {
        fontWeight: 'bold',
    },
    addressDetails: {
        color: '#555',
    },
    paymentSection: {
        marginVertical: 10,
    },
    paymentTitle: {
        fontWeight: 'bold',
    },
    paymentDetails: {
        color: '#555',
    },
    orderSection: {
        marginVertical: 10,
    },
    orderTitle: {
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    itemName: {
        flex: 1,
        paddingLeft: 10,
    },
    itemPrice: {
        color: '#555',
    },
    summaryContainer: {
        marginVertical: 10,
    },
    summaryTitle: {
        fontWeight: 'bold',
    },
    summaryItem: {
        color: '#555',
    },
    placeOrderButton: {
        backgroundColor: '#007bff',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    placeOrderButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    safeAreaContainer: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    roundedButton: {
        borderRadius: 50, // Añade bordes redondeados
        overflow: 'hidden', // Oculta el contenido que sobresale de los bordes redondeados
    },
});

export default styles;
