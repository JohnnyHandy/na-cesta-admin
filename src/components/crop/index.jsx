/* eslint-disable no-unused-vars */
import React, {
  useState, useCallback, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone-uploader';
import ReactCrop from 'react-image-crop';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import 'react-dropzone-uploader/dist/styles.css';
import 'react-image-crop/dist/ReactCrop.css';

import ImageDetails from '../details/imageDetails';
import { uploadImageRequest, deleteImageRequest } from '../../store/products';

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

export default function UploadCrop(props) {
  const { fields, values, productsState } = props;
  const dispatch = useDispatch();
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const onSelectFile = (file) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => setUpImg({
      result: reader.result,
      info: file,
    }));
    reader.readAsDataURL(file);
  };
  function generateDownload(previewCanvas, getCrop) {
    if (!getCrop || !previewCanvas) {
      return;
    }

    const canvas = getResizedCanvas(previewCanvas, getCrop.width, getCrop.height);

    canvas.toBlob(
      (blob) => {
        const imageFile = new File([blob], upImg.name);
        dispatch(uploadImageRequest({
          info: upImg.info,
          file: imageFile,
          fields,
        }));
        setCompletedCrop(null);
        setUpImg();
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
    // console.log(status, meta, file);
    onSelectFile(file);
  };

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

  const deleteImage = (params) => dispatch(deleteImageRequest({
    ...params,
    fields,
  }));
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <ImageDetails
        controls
        deleteImage={deleteImage}
        loading={productsState.isFetching}
        images={values.map((item) => ({
          src: `https://${process.env.REACT_APP_S3_BUCKET}.s3-${process.env.REACT_APP_REGION}.amazonaws.com/${item.key}`,
          objectKey: item.key,
        }))}
        fields={fields}
      />
      <div>
        <Dropzone
          PreviewComponent={null}
          accept="image/*"
          autoUpload={false}
          onChangeStatus={handleChangeStatus}
          inputContent="Arraste a foto para essa área ou clique para adicionar foto"
          inputWithFilesContent="Arraste a foto para essa área ou clique para adicionar foto"
          styles={{
            inputLabelWithFiles: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: '0',
              bottom: '0',
              left: '0',
              right: '0',
              fontFamily: 'Helvetica, sans-serif',
              fontSize: '20px',
              fontWeight: '600',
              color: '#2484FF',
              MozOsxFontSmoothing: 'grayscale',
              WebkitFontSmoothing: 'antialiased',
              cursor: 'pointer',
            },
            dropzone: {
              width: '50vw',
            },
          }}
        />
      </div>
      <ReactCrop
        src={upImg && upImg.result}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
        style={{
          margin: '1vh 1vw',
        }}
        imageStyle={{
          maxHeight: '50vh',
        }}
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '25vw',
        }}
      >
        <Button
          type="button"
          disabled={!completedCrop?.width || !completedCrop?.height}
          onClick={() => generateDownload(previewCanvasRef.current, completedCrop)}
        >
          Confirmar
        </Button>
        <Button
          type="button"
          color="warning"
          disabled={!completedCrop?.width || !completedCrop?.height}
          onClick={() => {
            setCompletedCrop(null);
            setUpImg();
          }}
        >
          Cancelar
        </Button>

      </div>
    </div>
  );
}

UploadCrop.propTypes = {
  fields: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ])).isRequired,
  values: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  productsState: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
  ])),
};

UploadCrop.defaultProps = {
  values: [],
  isFetching: false,
  productsState: {
    isFetching: false,
    items: [],
    images: {},
  },
};
