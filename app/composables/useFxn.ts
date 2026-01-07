
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

    arraySum: (array: any[], prop?: string) => {
        if (!Array.isArray(array)) return 0;

        return array.reduce((acc, curr) => {
            const value = prop ? curr?.[prop] : curr;
            const num = Number(value);

            return !isNaN(num) ? acc + num : acc;
        }, 0);
    },

    digitDisplay: (numb: any) => {
        // 1. Safety check: ensure it is a valid number
        const value = Number(numb);
        if (isNaN(value)) return "0.00";

        // 2. Convert to string with fixed 2 decimal places
        // This turns 5000 into "5000.00" and 5000.5 into "5000.50"
        const parts: any = value.toFixed(2).split(".");

        // 3. Add commas to the integer part (index 0)
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // 4. Rejoin
        return parts.join(".");
    },
}