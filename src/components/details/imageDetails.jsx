import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Button } from 'reactstrap';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { CgArrowLeftR, CgArrowRightR } from 'react-icons/cg';

import Loading from '../loading';

const ImageDetailsContainer = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;  
`;
const SelectedImage = styled('img')`
  max-height: 150px;
  max-width: 150px;
`;
const ImageIconsContainer = styled('div')`
  display: flex;
  height: 15vh;
  width: 35vw;
`;
const ImageIconContainer = styled('div')`
    display: flex;
    flex-direction: column;
    margin: 1vh 1vw;  
`;

const ImageIconControls = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const ImageIconWrapper = styled('button')`
  background: white;
  border: ${(props) => (props.selected ? '2px solid blue' : '')};
  cursor: pointer;
  height: 10vh;
  margin: auto 0.5vw;
  width: 5vw
`;
const ImageIcon = styled('img')`
  width: 4vw
`;

const ImageDetails = ({
  images, controls, deleteImage, loading,
}) => {
  const [showImageIndex, setShowImageIndex] = React.useState(0);
  if (loading) {
    return <Loading />;
  }
  if (!images || !images[showImageIndex]) {
    return <span> No images available </span>;
  }
  return (
    <ImageDetailsContainer>
      <SelectedImage
        style={{
          maxHeight: '150px',
          maxWidth: '150px',
          margin: '1vh 1vw',
        }}
        src={images[showImageIndex].src || images[showImageIndex].url}
        alt={images[showImageIndex].id}
      />
      {
        controls && (
        <Button
          size="sm"
          color="danger"
          onClick={() => deleteImage({
            objectKey: images[showImageIndex].objectKey,
            index: showImageIndex,
          })}
        >
          Excluir
          {' '}
          <AiOutlineCloseSquare />
        </Button>
        )

      }
      <ImageIconsContainer>
        {images.map((item, index) => (
          <ImageIconContainer
            key={item.id || item.objectKey || item.key}
          >
            <ImageIconWrapper
              type="button"
              selected={index === showImageIndex}
              onClick={() => setShowImageIndex(index)}
            >
              <ImageIcon
                src={item.src || item.url || item}
                alt={item.id}
              />
            </ImageIconWrapper>
            {
              controls && (
              <ImageIconControls>
                <CgArrowLeftR style={{ cursor: 'pointer' }} />
                <CgArrowRightR style={{ cursor: 'pointer' }} />
              </ImageIconControls>
              )

            }
          </ImageIconContainer>
        ))}
      </ImageIconsContainer>
    </ImageDetailsContainer>
  );
};

ImageDetails.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  controls: PropTypes.bool,
  deleteImage: PropTypes.func,
  loading: PropTypes.bool,
};

ImageDetails.defaultProps = {
  controls: false,
  deleteImage: () => {},
  loading: false,
};

export default ImageDetails;
