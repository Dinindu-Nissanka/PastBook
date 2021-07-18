import { Col, Row, Button } from 'antd';
import React, { FC, useCallback, useState } from 'react';
import { Photo } from '../../types/user.type';
import { Grid, GridImage } from '../../types/photo-grid.type';
import update from 'immutability-helper';
import { PhotoCard } from './grid-photo';

import './photo-grid.scss';

export interface PhotoGridProps {
  photos: Array<Photo>;
  userGrid: Grid;
  onSave: Function;
  onCreateNewGrid: Function;
}

export const PhotoGrid: FC<PhotoGridProps> = ({
  photos,
  userGrid,
  onSave,
  onCreateNewGrid,
}): JSX.Element => {
  const testArray = [
    {
      id: 204900001,
      message: '',
      picture: '1.png',
      pictureSmall: '',
      pictureMedium: '',
      pictureStored: '',
      timestamp: 1578391381,
    },
    {
      id: 204900002,
      message: '',
      picture: '2.png',
      pictureSmall: '',
      pictureMedium: '',
      pictureStored: '',
      timestamp: 1578391381,
    },
    {
      id: 204900003,
      message: '',
      picture: '3.jpg',
      pictureSmall: '',
      pictureMedium: '',
      pictureStored: '',
      timestamp: 1578391381,
    },
    {
      id: 204900004,
      message: '',
      picture: '1.png',
      pictureSmall: '',
      pictureMedium: '',
      pictureStored: '',
      timestamp: 1578391381,
    },
    {
      id: 204900005,
      message: '',
      picture: '2.png',
      pictureSmall: '',
      pictureMedium: '',
      pictureStored: '',
      timestamp: 1578391381,
    },
    {
      id: 204900006,
      message: '',
      picture: '3.jpg',
      pictureSmall: '',
      pictureMedium: '',
      pictureStored: '',
      timestamp: 1578391381,
    },
    {
      id: 204900007,
      message: '',
      picture: '1.png',
      pictureSmall: '',
      pictureMedium: '',
      pictureStored: '',
      timestamp: 1578391381,
    },
    {
      id: 204900008,
      message: '',
      picture: '2.png',
      pictureSmall: '',
      pictureMedium: '',
      pictureStored: '',
      timestamp: 1578391381,
    },
    {
      id: 204900009,
      message: '',
      picture: '3.jpg',
      pictureSmall: '',
      pictureMedium: '',
      pictureStored: '',
    },
  ];

  const [isModified, setIsModified] = useState<boolean>(false);

  const [cards, setCards] = useState<Array<GridImage>>(userGrid.grid);

  const onGridSave = (): void => {
    onSave(cards);
    setIsModified(false);
  };

  const onGridCreateClick = (): void => {
    onCreateNewGrid();
  };

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );

      setIsModified(true);
    },
    [cards]
  );

  const renderImage = (image: GridImage, index: number) => {
    return (
      <Col key={image.id} className="gutter-row" span={8}>
        <PhotoCard
          key={image.id}
          index={index}
          id={image.id}
          imageUrl={
            photos.find((photo) => photo.id.toString() === image.id)?.picture ||
            'logo192.png'
          }
          moveCard={moveCard}
        />
      </Col>
    );
  };

  return (
    <div className="photo-grid">
      <div className="header">
        <h1 className="header__title">Photo Grid</h1>
        <p className="header__content">
          This is your photo grid. Drag and drop the photo grid to reorder them
        </p>
        <p>Or Create new photo grid using your uploaded photos</p>
      </div>
      <div className="container">
        <Row gutter={[3, 3]}>
          {cards.map((image, index) => renderImage(image, index))}
        </Row>
        <div className="container__button">
          {isModified && (
            <Button
              type="primary"
              className="container__button-save"
              onClick={onGridSave}
            >
              Save
            </Button>
          )}
          <Button type="primary" onClick={onGridCreateClick}>
            Create new Photo grid
          </Button>
        </div>
      </div>
    </div>
  );
};
