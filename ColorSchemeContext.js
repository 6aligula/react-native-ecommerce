import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme } from './globalStyles';

const ColorSchemeContext = createContext();

export const ColorSchemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const handleColorSchemeChange = ({ colorScheme }) => {
      setColorScheme(colorScheme);
    };

    Appearance.addChangeListener(handleColorSchemeChange);

    return () => {
      Appearance.removeChangeListener(handleColorSchemeChange);
    };
  }, []);

  const stylesGlobal = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme, stylesGlobal }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorSchemeContext = () => {
  return useContext(ColorSchemeContext);
};
