
export default {
    capsFirstLetter: (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    },

    passwordRegex: (password: string, min: number = 8) => {
        /*Minimum of '$min' characters, One special character,  A number*/
        if (!password || password.length < min) return false;
        if (!/\d/.test(password)) return false;
        if (!/[!@#$%^&*(),.?":{}|<>\-_]/.test(password)) return false;
        return true;
    },
}