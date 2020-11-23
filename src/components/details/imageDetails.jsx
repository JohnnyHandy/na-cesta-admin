import React from 'react';
import PropTypes from 'prop-types';

const ImageDetails = ({ images }) => {
  const [showImageIndex, setShowImageIndex] = React.useState(0);
  if (!images) {
    return <span> No images available </span>;
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div>
        <img
          style={{
            maxHeight: '150px',
            maxWidth: '150px',
          }}
          src={images[showImageIndex].src}
          alt={images[showImageIndex].id}
        />
      </div>
      <div
        style={{
          display: 'flex',
          width: '35vw',
          height: '8vh',
        }}
      >
        {images.map((item, index) => (
          <button
            type="button"
            style={{
              height: '100%',
              border: index === showImageIndex ? '2px solid blue' : '',
              cursor: 'pointer',
              margin: 'auto 0.5vw',
              background: 'white',
            }}
            onClick={() => setShowImageIndex(index)}
            key={item.id}

          >
            <img
              src={item.src}
              alt={item.id}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

ImageDetails.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageDetails;
