const generatePassword = () => {
    const randomValues = window.crypto.getRandomValues(new BigUint64Array(2));

    return Array(2)
        .fill("")
        .map((_, index) => randomValues[index].toString(36))
        .join("")
        .split("")
        .map((character, index) => (index % 2 ? character.toUpperCase() : character))
        .map((character, i, a) => {
            const specialCharaters = ".>,/_)?+=.-!|*$&^(".split("");
            return Math.random() > 0.8 ? specialCharaters[Math.floor(Math.random() * specialCharaters.length)] : character;
        })
        .join("");
};

export { generatePassword };
