export const formatText = (text, maxLength) => {
  if (text) {
    if (text.startsWith('"') && text.endsWith('"')) {
      text = text.slice(1, -1);
    }
    if (maxLength && text.length > maxLength) {
      text = text.slice(0, maxLength - 3) + "...";
    }
    return text;
  }
};
