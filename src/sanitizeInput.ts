export const sanitizeInput = (input: string) => {
    return input.trim().replace(/[^a-zA-Z0-9]/g, '');
}