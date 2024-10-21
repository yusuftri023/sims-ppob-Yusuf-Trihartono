const base64ToFile = (
  base64String: string,
  mimeType: string,
  fileName: string
) => {
  const base64Data = base64String.replace(/^data:.+;base64,/, "");
  const byteCharacters = atob(base64Data); // Decode Base64 string
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: mimeType });

  const newfile = new File([blob], fileName, {
    type: mimeType,
  });
  return newfile;
};
export default base64ToFile;
