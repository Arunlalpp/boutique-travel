/** The site's single currency setting. The design prices everything in rupees. */
export const currency = { code: "INR", locale: "en-IN" } as const;

export function money(amount: number): string {
    return new Intl.NumberFormat(currency.locale, {
        style: "currency",
        currency: currency.code,
        maximumFractionDigits: 0,
    }).format(Math.round(amount));
}
