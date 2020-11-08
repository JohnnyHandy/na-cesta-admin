import React from 'react'

const ImageDetails  = ({ images }) => {
    const [showImageIndex, setShowImageIndex] = React.useState(0)
    if(!Boolean(images)){
        return <span> No images available </span>
    }
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <div>
                <img
                    style={{
                        maxHeight: '150px',
                        maxWidth: '150px'
                    }}
                    src={images[showImageIndex]['src']}
                    alt={images[showImageIndex]['id']}
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
                        <img
                            style={{
                                height: '100%',
                                border: index === showImageIndex ? '2px solid blue' : '',
                                cursor: 'pointer',
                                margin: 'auto 0.5vw'
                            }}
                            onClick={() => setShowImageIndex(index)}
                            key={item.id}
                            src={item.src}
                            alt={item.id}
                        />
                ))}
            </div>
        </div>
    )
}

export default ImageDetails