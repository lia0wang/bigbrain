/**
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 * More info:
 *   https://developer.mozilla.org/en-US/docs/Web/API/File
 *   https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 *   https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 *
 * Example Usage:
 *   const file = document.querySelector('input[type="file"]').files[0];
 *   console.log(fileToDataUrl(file));
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */
export function fileToDataUrl (file: Blob): Promise<string> {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise<string>((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result as string);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

/**
* Given a Blob object representing a jpg or png image, resizes the image to the specified width and height.
* This function uses a canvas element to draw and scale the input image, then returns the resized image as a Blob object.
*  More info:
*  https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
*  https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
*  https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
*  https://developer.mozilla.org/en-US/docs/Web/API/FileReader
*  Example Usage:
*  const file = document.querySelector('input[type="file"]').files[0];
*  const resizedImageBlob = await resizeImage(file, 64, 64);
*  @param {Blob} inputFile The input image file to be resized.
*  @param {number} width The desired width of the resized image.
*  @param {number} height The desired height of the resized image.
*  @return {Promise<Blob>} Promise which resolves to the resized image as a Blob object.
*/
export const resizeImage = (inputFile: Blob, width: number, height: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = String(event.target.result);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          resolve(blob);
        }, inputFile.type);
      };
      img.onerror = (error) => {
        reject(error);
      };
    };
    reader.readAsDataURL(inputFile);
  });
};
