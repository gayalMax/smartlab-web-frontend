import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, Box } from '@material-ui/core';
import { Image } from 'cloudinary-react';
import { AiOutlineDelete, AiOutlineCloudUpload, AiOutlineWarning } from 'react-icons/ai';

const styles = {
  palette: {
    window: '#23395B',
    sourceBg: '#FFFFFF',
    windowBorder: '#23395B',
    tabIcon: '#FFFFFF',
    inactiveTabIcon: '#8E9FBF',
    menuIcons: '#CCE8FF',
    link: '#D81E5B',
    action: '#5333FF',
    inProgress: '#68CDAA',
    complete: '#68CDAA',
    error: '#ff0000',
    textDark: '#000000',
    textLight: '#ffffff'
  },
  fonts: {
    default: null,
    'sans-serif': {
      url: null,
      active: true
    }
  }
};

const ImageUpload = ({ variant, color, sources, onSuccess }) => {
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  const uploadedImage = publicId => {
    setImage(publicId);
    onSuccess(publicId);
  };

  const onUpload = (err, result) => {
    if (err) {
      setError(err);
      uploadedImage(null);
    } else if (result && result.event === 'success') {
      setError(null);
      uploadedImage(result.info.public_id);
    }
  };

  const uploadWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: 'open-inventory-system',
      uploadPreset: 'public',
      sources,
      multiple: false,
      styles
    },
    onUpload
  );

  const showWidget = () => {
    uploadWidget.open();
  };

  const getButton = () => {
    if (error != null) {
      return (
        <Button
          startIcon={<AiOutlineWarning />}
          variant={variant}
          color={color}
          onClick={showWidget}
        >
          Upload Photo
        </Button>
      );
    }

    if (image === null) {
      return (
        <Button
          startIcon={<AiOutlineCloudUpload />}
          variant={variant}
          color={color}
          onClick={showWidget}
        >
          Upload Photo
        </Button>
      );
    }

    return (
      <Button
        startIcon={<AiOutlineDelete />}
        variant={variant}
        color={color}
        onClick={() => uploadedImage(null)}
      >
        Remove Photo
      </Button>
    );
  };

  return (
    <Grid container direction="column" alignItems="flex-start">
      <Grid item>{getButton()}</Grid>
      {error && (
        <Grid item>
          <Typography color="secondary">Error uploading image</Typography>
        </Grid>
      )}
      {image && (
        <Grid item>
          <Box pt={1}>
            <Image publicId={image} width="150" style={{ borderRadius: 8 }} />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

ImageUpload.defaultProps = {
  variant: 'contained',
  color: 'primary',
  sources: ['local', 'url', 'facebook']
};

ImageUpload.propTypes = {
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  sources: PropTypes.arrayOf(PropTypes.string),
  onSuccess: PropTypes.func.isRequired
};

export default ImageUpload;
