export const validateEmail = (email) => {
    // Nota: he eliminado las letras mayúsculas 'A-Z' de la expresión regular.
    const regex = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return regex.test(email);
};