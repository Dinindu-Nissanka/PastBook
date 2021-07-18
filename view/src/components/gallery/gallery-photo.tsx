import React, { FC } from 'react';
import { Image } from 'antd';

export interface GalleryPhotoCardProps {
  id: string;
  imageUrl: string;
  onSelect: Function;
}

export const GalleryPhotoCard: FC<GalleryPhotoCardProps> = ({
  imageUrl,
  id,
  onSelect,
}): JSX.Element => {
  return (
    <div>
      <Image
        width={120}
        height={120}
        preview={false}
        src={imageUrl}
        onClick={() => onSelect(id)}
      />
    </div>
  );
};
