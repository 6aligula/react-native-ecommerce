import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    description: {
        fontSize: 16,
        color: '#34495e',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },
    subTitle2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },
    productName: {
        fontSize: 16,
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
    productDescription: {
        fontSize: 14,
        color: '#34495e',
        marginBottom: 16,
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
