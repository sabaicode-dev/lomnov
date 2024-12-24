export function toSubstring(string: string, maxLength: number = 20): string {
    return string?.length > maxLength ? string.substring(0, maxLength) + '...' : string
}