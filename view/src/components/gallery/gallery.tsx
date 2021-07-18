import React, { FC, useEffect, useState } from 'react';
import { Col, Row, Button, notification } from 'antd';
import { Photo, PhotoGallery } from '../../types/gallery.type';
import './gallery.scss';
import { GridImage } from '../../types/photo-grid.type';
import { GalleryPhotoCard } from './gallery-photo';

export interface GalleryProps {
  photos: Array<Photo>;
  onSave: Function;
  photoGridExists: boolean;
  onBack: Function;
}

export const Gallery: FC<GalleryProps> = ({
  photos,
  onSave,
  photoGridExists,
  onBack,
}): JSX.Element => {
  const [images, setImages] = useState<Array<PhotoGallery>>(
    photos.map((photo) => ({
      ...photo,
      isSelected: false,
    }))
  );

  useEffect(() => {
    setImages(
      photos.map((photo) => ({
        ...photo,
        isSelected: false,
      }))
    );
  }, [photos]);

  const onSelect = (id: string): void => {
    const isAlreadySelected = images.find(
      (image) => image.id.toString() === id && image.isSelected
    );

    if (isAlreadySelected) {
      setImages(
        images.map((image) =>
          image.id.toString() === id ? { ...image, isSelected: false } : image
        )
      );
    } else {
      const count = images.filter((image) => image.isSelected === true).length;
      if (count >= 9) {
        notification.error({
          message: 'Limit exceeded',
          description: 'You can only select 9 photos',
        });
      } else {
        setImages(
          images.map((image) =>
            image.id.toString() === id ? { ...image, isSelected: true } : image
          )
        );
      }
    }
  };

  const onGridCreate = async (): Promise<void> => {
    const grid: Array<GridImage> = images
      .filter((image) => image.isSelected === true)
      .map((image, index) => ({
        id: image.id.toString(),
        order: index,
      }));
    onSave(grid);
  };

  const onReturnToGrid = (): void => {
    onBack();
  };

  const renderImage = (image: PhotoGallery) => {
    return (
      <Col key={image.id} className="gutter-row" span={3}>
        <GalleryPhotoCard
          imageUrl={image.picture}
          id={image.id.toString()}
          onSelect={onSelect}
          isSelected={image.isSelected}
        />
      </Col>
    );
  };

  return (
    <div className="gallery">
      <div className="header">
        <h1 className="header__title">Gallery</h1>
        <p className="header__content">
          {!photoGridExists &&
            `You have not created your favorite photo grid yet.`}
        </p>
        <p>Please select 9 photos to create your grid</p>
      </div>
      <div className="container">
        <Row gutter={[8, 8]}>{images.map((image) => renderImage(image))}</Row>
        <div className="container__button">
          <Button
            type="primary"
            className="container__button-save"
            disabled={
              images.filter((image) => image.isSelected === true).length !== 9
            }
            onClick={onGridCreate}
          >
            Save
          </Button>
          <Button
            type="primary"
            hidden={!photoGridExists}
            onClick={onReturnToGrid}
          >
            Return to grid
          </Button>
        </div>
      </div>
    </div>
  );
};
