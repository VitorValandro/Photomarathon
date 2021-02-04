import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { getBinaryContent } from 'jszip-utils';

const apiUrl = "http://localhost:3333";

function zipPhotosDownload(photos, zipname){
  const zip = new JSZip();
  let count = 0;
  const zipFilename = zipname;

  photos.forEach((image) => {
    let filename = image;
    // carrega um arquivo e adiciona ele ao arquivo zip
    getBinaryContent(`${apiUrl}/uploadedPhotos/${image}`, (err, data) => {
      if(err){
        throw err;
      }
      zip.file(filename, data, { binary: true });
      count++;
      if (count === photos.length) {
        zip.generateAsync({ type: 'blob' }).then(function (content) {
          saveAs(content, zipFilename);
        });
      }
    });
  });
}

export default zipPhotosDownload;