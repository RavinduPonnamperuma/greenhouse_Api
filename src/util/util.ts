export function flattenField<T = any>(array: any[], field: string): T[] {
    return array.map((item) => item[field]);
}