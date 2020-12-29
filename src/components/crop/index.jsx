import React, {
  useState, useCallback, useRef, useEffect,
} from 'react';
import Dropzone from 'react-dropzone-uploader';
import ReactCrop from 'react-image-crop';
import 'react-dropzone-uploader/dist/styles.css';
import 'react-image-crop/dist/ReactCrop.css';

import ImageDetails from '../details/imageDetails';

// Increase pixel density for crop preview quality on retina screens.
const pixelRatio = window.devicePixelRatio || 1;

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the preview size.
function getResizedCanvas(canvas, newWidth, newHeight) {
  const tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext('2d');
  ctx.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    newWidth,
    newHeight,
  );

  return tmpCanvas;
}

// function generateDownload(previewCanvas, crop) {
//   if (!crop || !previewCanvas) {
//     return;
//   }

//   const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

//   canvas.toBlob(
//     (blob) => {
//       const previewUrl = window.URL.createObjectURL(blob);

//       const anchor = document.createElement('a');
//       anchor.download = 'cropPreview.png';
//       anchor.href = URL.createObjectURL(blob);
//       anchor.click();

//       window.URL.revokeObjectURL(previewUrl);
//     },
//     'image/png',
//     1,
//   );
// }

export default function App() {
  const [fileList, setFileList] = useState([]);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (file) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => setUpImg(reader.result));
    reader.readAsDataURL(file);
  };
  function generateDownload(previewCanvas, getCrop) {
    if (!getCrop || !previewCanvas) {
      return;
    }

    const canvas = getResizedCanvas(previewCanvas, getCrop.width, getCrop.height);

    canvas.toBlob(
      (blob) => {
        const previewUrl = window.URL.createObjectURL(blob);
        setFileList(fileList.concat(previewUrl));
        setCompletedCrop(null);
        setUpImg();

        // const anchor = document.createElement('a');
        // anchor.download = 'cropPreview.png';
        // anchor.href = URL.createObjectURL(blob);
        // anchor.click();

        // window.URL.revokeObjectURL(previewUrl);
      },

      'image/png',
      1,
    );
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
    onSelectFile(file);
  };

  // receives array of files that are done uploading when submit button is clicked
  // const handleSubmit = (files, allFiles) => {
  //   console.log(files.map(f => f.meta))
  //   allFiles.forEach(f => f.remove())
  // }

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const actualCrop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = actualCrop.width * pixelRatio;
    canvas.height = actualCrop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      actualCrop.x * scaleX,
      actualCrop.y * scaleY,
      actualCrop.width * scaleX,
      actualCrop.height * scaleY,
      0,
      0,
      actualCrop.width,
      actualCrop.height,
    );
  }, [completedCrop]);

  return (
    <div className="App">
      <ImageDetails images={fileList} />
      <div>
        <Dropzone
          PreviewComponent={null}
          accept="image/*"
          autoUpload={false}
          onChangeStatus={handleChangeStatus}
        />
      </div>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      <div>
        <canvas
          ref={previewCanvasRef}
          style={{
            display: 'none',
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />
      </div>
      <p>
        {/* Note that the download below won't work in this sandbox due to the
        iframe missing 'allow-downloads'. It's just for your reference. */}
      </p>
      <button
        type="button"
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={() => generateDownload(previewCanvasRef.current, completedCrop)}
      >
        Download cropped image
      </button>
    </div>
  );
}
