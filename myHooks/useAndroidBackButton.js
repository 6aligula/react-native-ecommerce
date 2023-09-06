// hooks/useAndroidBackButton.js
import { useEffect, useCallback } from 'react';
import { BackHandler } from 'react-native';


const useAndroidBackButton = (navigation, customBackAction = null) => {
    const handleBackPress = useCallback(() => {
        if (customBackAction) {
            customBackAction();
            return true;
        } else {
            navigation.goBack(); // Navega de vuelta a la pantalla anterior
            return true;
        }
        
    }, [customBackAction, navigation]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, [handleBackPress]);
};

export default useAndroidBackButton;
