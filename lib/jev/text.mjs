/** Word count over unicode letters and digits; shared by the gates. */
export const wordCount = (text) => text.split(/[^\p{L}\p{N}]+/u).filter(Boolean).length;
