class DoubleExtensions {
    public static toTrimmedString(target: number, decimalFormat: string): string {
        let strValue = target.toString(decimalFormat);
        if (strValue.includes('.')) {
            strValue = strValue.replace(/0+$/, '');
        }
        if (strValue.endsWith('.')) {
            strValue = strValue.slice(0, -1);
        }
        return strValue;
    }
}
export default DoubleExtensions;