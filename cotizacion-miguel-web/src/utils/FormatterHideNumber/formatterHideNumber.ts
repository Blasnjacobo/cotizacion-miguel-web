export const formatterHideNumber = (cardNumber: string, reveal?: boolean, numberHide: number = 4): string => {
    if (!cardNumber || cardNumber.length < numberHide) {
        throw new Error("Invalid number.");
    }

    return reveal
        ? cardNumber
        : cardNumber.slice(0, -numberHide).replace(/\d/g, "*") + cardNumber.slice(-numberHide);
};