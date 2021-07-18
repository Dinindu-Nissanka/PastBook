import React, { FC } from 'react';
import { Image } from 'antd';

export interface GalleryPhotoCardProps {
  id: string;
  imageUrl: string;
  onSelect: Function;
  isSelected: boolean;
}

export const GalleryPhotoCard: FC<GalleryPhotoCardProps> = ({
  imageUrl,
  id,
  onSelect,
  isSelected,
}): JSX.Element => {
  return (
    <div>
      <Image
        style={{
          opacity: isSelected ? 0.3 : 1,
          borderStyle: isSelected ? 'solid' : 'none',
          borderColor: isSelected ? '#003399' : 'white',
        }}
        width={120}
        height={120}
        preview={false}
        src={imageUrl}
        onClick={() => onSelect(id)}
      />
    </div>
  );
};
