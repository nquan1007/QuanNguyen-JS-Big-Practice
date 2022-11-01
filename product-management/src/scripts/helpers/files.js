/**
 * Pass the image as Blob File type to convert to a string to save to the database
 * @param {File} file 
 * @returns {String}
 */
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    }
    reader.onerror = (error) => {
      reject(error);
    }
  })
}

export { convertToBase64 }