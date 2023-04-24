// hooks/useAndroidBackButton.js
import { useEffect } from 'react';
import { BackHandler } from 'react-native';


const useAndroidBackButton = (navigation) => {
    const handleBackPress = () => {
        navigation.goBack(); // Navega de vuelta a la pantalla anterior
        return true;
    };
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, [handleBackPress, navigation]);
};

export default useAndroidBackButton;
