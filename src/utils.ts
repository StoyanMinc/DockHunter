export const formatScore = (score: number, digitCount: number) => {
    let result = '';
    const scoreAsString = score.toString();
    if (scoreAsString.length < digitCount) {
        const zerosToAdd = digitCount - scoreAsString.length;
        for (let i = 0; i < zerosToAdd; i++) {
            result += 0
        }
    };

    return result + scoreAsString;
}