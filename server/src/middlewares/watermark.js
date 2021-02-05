const Jimp = require("jimp");
const path = require('path');

module.exports = function (originalPhoto, watermark, filename){
  const MARGIN_PERCENTAGE = 5;

  const editImage = async () => {
    const [image, logo] = await Promise.all([
      Jimp.read(originalPhoto),
      Jimp.read(watermark)
    ]);

    logo.resize(image.bitmap.width / 10, Jimp.AUTO);

    const xMargin = (image.bitmap.width * MARGIN_PERCENTAGE) / 100;
    const yMargin = (image.bitmap.width * MARGIN_PERCENTAGE) / 100;

    const X = image.bitmap.width - logo.bitmap.width - xMargin;
    const Y = image.bitmap.height - logo.bitmap.height - yMargin;

    return image.composite(logo, X, Y, [
      {
        mode: Jimp.BLEND_SCREEN,
        opacitySource: 0.1,
        opacityDest: 1
      }
    ]);
  };

  const filePathWhereSave = path.join(__dirname, '..', '..', 'uploads', filename);

  editImage().then(image => image.write(filePathWhereSave)); // sobreescreve arquivo original pelo editado
}