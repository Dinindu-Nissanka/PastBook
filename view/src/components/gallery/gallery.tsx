import React, { FC, useState } from 'react';
import { Col, Row, Button, notification } from 'antd';
import { Photo } from '../../types/user.type';
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
  const [selectedPhotos, setSelectedPhotos] = useState<Array<string>>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const onSelect = (id: string): void => {
    const tempArray = selectedPhotos;
    const index = tempArray.indexOf(id);
    if (index > -1) {
      tempArray.splice(index, 1);
    } else {
      if (tempArray.length === 9) {
        notification.error({
          message: 'Limit exceeded',
          description: 'You can only select 9 photos',
        });
      } else {
        tempArray.push(id);
      }
    }
    setSelectedPhotos(tempArray);
    if (tempArray.length === 9) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const onGridCreate = async (): Promise<void> => {
    const grid: Array<GridImage> = selectedPhotos.map((id, index) => ({
      id,
      order: index,
    }));
    onSave(grid);
  };

  const onReturnToGrid = (): void => {
    onBack();
  };

  const renderImage = (image: Photo) => {
    return (
      <Col key={image.id} className="gutter-row" span={3}>
        <GalleryPhotoCard
          imageUrl={image.picture}
          // imageUrl="1.png"
          id={image.id.toString()}
          onSelect={onSelect}
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
        <Row gutter={[8, 8]}>{photos.map((image) => renderImage(image))}</Row>
        <div className="container__button">
          <Button
            type="primary"
            className="container__button-save"
            disabled={isDisabled}
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
