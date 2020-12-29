import React from 'react';
import PropTypes from 'prop-types';

const DragAndDrop = (props) => {
  const [drag, setDrag] = React.useState(false);
  const [dragCounter, setDragCounter] = React.useState(0);
  const { handleDropMethod, children } = props;
  const dropRef = React.useRef();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter - 1);
    if (dragCounter === 0) {
      setDrag(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleDropMethod(e.dataTransfer.files);
      e.dataTransfer.clearData();
      setDragCounter(0);
    }
  };

  React.useEffect(() => {
    const div = dropRef.current;
    div.addEventListener('dragenter', handleDragIn);
    div.addEventListener('dragleave', handleDragOut);
    div.addEventListener('dragover', handleDrag);
    div.addEventListener('drop', handleDrop);
    return () => {
      div.removeEventListener('dragenter', handleDragIn);
      div.removeEventListener('dragleave', handleDragOut);
      div.removeEventListener('dragover', handleDrag);
      div.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <div
      style={{ display: 'inline-block', position: 'relative' }}
      ref={dropRef}
    >
      {drag
          && (
          <div
            style={{
              border: 'dashed grey 4px',
              backgroundColor: 'rgba(255,255,255,.8)',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: 0,
                left: 0,
                textAlign: 'center',
                color: 'grey',
                fontSize: 36,
              }}
            >
              <div>drop here :)</div>
            </div>
          </div>
          )}
      {children}
    </div>
  );
};

DragAndDrop.propTypes = {
  children: PropTypes.node.isRequired,
  handleDropMethod: PropTypes.func.isRequired,
};
export default DragAndDrop;
