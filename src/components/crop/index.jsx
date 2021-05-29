/* eslint-disable no-unused-vars */
import React, {
  useState, useCallback, useRef, useEffect,
} from 'react';
import { change } from 'redux-form';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone-uploader';
import { error } from 'react-notification-system-redux';
import { useDispatch } from 'react-redux';
import 'react-dropzone-uploader/dist/styles.css';
import 'react-image-crop/dist/ReactCrop.css';

import ImageDetails from '../details/imageDetails';
import { uploadImageRequest, deleteImageRequest, updateImagesOrderRequest } from '../../store/products';
import { generateId } from '../../utils/functions';

function compare(a, b) {
  function getOrder(filename) {
    return filename.substr(0, filename.indexOf('-')) * 1;
  }
  if (getOrder(a.filename) < getOrder(b.filename)) {
    return -1;
  }
  if (getOrder(a.filename) > getOrder(b.filename)) {
    return 1;
  }
  return 0;
}

export default function UploadCrop(props) {
  const {
    fields, values, productsState, setImagesToDelete, imagesToDelete, isEditing, productId,
  } = props;
  const dispatch = useDispatch();
  const imagesValue = values.sort(compare);
  const moveImage = (oldIndex, newIndex) => {
    const currentOldIndexImage = imagesValue[oldIndex];
    const currentOldIndexImageBasename = currentOldIndexImage.filename.substr(currentOldIndexImage.filename.indexOf('-') + 1);
    const currentNewIndexImage = imagesValue[newIndex];
    const currentNewIndexImageBasename = currentNewIndexImage.filename.substr(currentNewIndexImage.filename.indexOf('-') + 1);
    const newCurrentOldIndexFilename = `${newIndex}-${currentOldIndexImageBasename}`;
    const currentOldIndexImageParams = {
      ...currentOldIndexImage,
      filename: newCurrentOldIndexFilename,
    };
    if (currentOldIndexImage.stored) {
      if (currentOldIndexImage.newParams
        && currentOldIndexImage.newParams.initialFilename === newCurrentOldIndexFilename) {
        delete currentOldIndexImageParams.newParams;
      } else {
        currentOldIndexImageParams.newParams = {
          newFilename: newCurrentOldIndexFilename,
          initialFilename:
          (currentOldIndexImage.newParams && currentOldIndexImage.newParams.initialFilename)
            ? currentOldIndexImage.newParams.initialFilename
            : currentOldIndexImage.filename,
          productId,
        };
      }
    }
    const newCurrentNewIndexFilename = `${oldIndex}-${currentNewIndexImageBasename}`;
    const currentNewIndexImageParams = {
      ...currentNewIndexImage,
      filename: newCurrentNewIndexFilename,
    };
    if (currentNewIndexImage.stored) {
      if (currentNewIndexImage.newParams
        && currentNewIndexImage.newParams.initialFilename === newCurrentNewIndexFilename) {
        delete currentNewIndexImageParams.newParams;
      } else {
        currentNewIndexImageParams.newParams = {
          newFilename: newCurrentNewIndexFilename,
          initialFilename:
          (currentNewIndexImage.newParams && currentNewIndexImage.newParams.initialFilename
            ? currentNewIndexImage.newParams.initialFilename
            : currentNewIndexImage.filename),
          productId,
        };
      }
    }
    const imagesToBeAdded = [currentOldIndexImageParams, currentNewIndexImageParams];
    let newImagesValue = imagesValue.filter(
      ((item) => (item.id !== currentOldIndexImage.id && item.id !== currentNewIndexImage.id)),
    );
    newImagesValue = newImagesValue.concat(imagesToBeAdded);
    dispatch(change('productsForm', 'images', newImagesValue));
  };
  const onSelectFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        if (img.width / img.height !== 1) {
          dispatch(
            error({
              title: 'Upload de imagem',
              message: 'Imagem precisa ter aspecto 1:1',
              autoDismiss: 1,
            }),
          );
        } else {
          const newImageOrder = fields.getAll() ? fields.getAll().length + 1 : 1;
          fields.push({
            file,
            filename: `${newImageOrder}-${file.name}`,
            content_type: file.type,
            stored: false,
            url: reader.result,
            id: generateId(3),
          });
        }
      };
    };
    const url = reader.readAsDataURL(file);
  };
  // // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === 'done') {
      onSelectFile(file);
    }
  };

  const deleteImage = (image) => {
    const imagesValues = fields.getAll();
    const imageIndex = imagesValues.findIndex((item) => item.id === image.id);
    if (image.stored) {
      const newImagesToDelete = imagesToDelete.concat({ ...image, productId });
      setImagesToDelete(newImagesToDelete);
    }
    const imageValuesAfterDelete = imagesValues.filter((item) => item.id !== image.id);
    const imageValuesWithFixedFilenames = imageValuesAfterDelete.map((item, index) => {
      if (index < imageIndex) {
        return item;
      }
      const basename = item.filename.substr(item.filename.indexOf('-') + 1);
      const newFilename = `${index}-${basename}`;
      const params = {
        ...item,
        filename: newFilename,
      };
      if (item.stored) {
        if (item.newParams && item.newParams.initialFilename === newFilename) {
          delete params.newParams;
        } else {
          const initialFilename = item.newParams ? item.newParams.initialFilename : item.filename;
          params.newParams = {
            newFilename: `${index}-${basename}`,
            initialFilename,
            productId,
          };
        }
      }
      return params;
    });
    dispatch(change('productsForm', 'images', imageValuesWithFixedFilenames));
  };
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
        images={imagesValue}
        fields={fields}
        moveImage={moveImage}
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
  imagesToDelete: PropTypes.arrayOf(PropTypes.object),
  setImagesToDelete: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  productId: PropTypes.number.isRequired,
};

UploadCrop.defaultProps = {
  values: [],
  isFetching: false,
  productsState: {
    isFetching: false,
    items: [],
    images: {},
  },
  imagesToDelete: [],
};
