import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

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

const ImageDetails = ({ images }) => {
  const [showImageIndex, setShowImageIndex] = React.useState(0);
  if (!images || !images[showImageIndex]) {
    return <span> No images available </span>;
  }
  return (
    <ImageDetailsContainer>
      <SelectedImage
        style={{
          maxHeight: '150px',
          maxWidth: '150px',
        }}
        src={images[showImageIndex].src || images[showImageIndex].url}
        alt={images[showImageIndex].id}
      />
      <ImageIconsContainer>
        {images.map((item, index) => (
          <ImageIconWrapper
            type="button"
            selected={index === showImageIndex}
            onClick={() => setShowImageIndex(index)}
            key={item.id}
          >
            <ImageIcon
              src={item.src || item.url || item}
              alt={item.id}
            />
          </ImageIconWrapper>
        ))}
      </ImageIconsContainer>
    </ImageDetailsContainer>
  );
};

ImageDetails.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageDetails;
