import { notification } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import {
  createOrUpdateUserPhotoGrid,
  getUserPhotoGrid,
} from '../../services/photo-grid.service';
import { getUserUploadedPhotos } from '../../services/user.service';
import { Grid, GridImage } from '../../types/photo-grid.type';
import { Photo } from '../../types/gallery.type';
import { Gallery } from '../gallery/gallery';
import { PhotoGrid } from '../photo-grid/photo-grid';

function Dashboard() {
  const [photoGrid, setPhotoGrid] = useState<Grid | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<Photo>>([]);
  const [isGalleryView, setIsGalleryView] = useState<boolean>(false);

  const fetchUserGrid = useCallback(async () => {
    const grid = await getUserPhotoGrid();
    setPhotoGrid(grid);
    if (!grid) {
      setIsGalleryView(true);
    } else {
      setIsGalleryView(false);
    }
  }, []);

  const fetchUserUploadedPhotos = useCallback(async () => {
    const uploadedPhotos = await getUserUploadedPhotos();
    setUploadedPhotos(uploadedPhotos);
  }, []);

  useEffect(() => {
    fetchUserGrid();
  }, [fetchUserGrid]);

  useEffect(() => {
    if (!photoGrid?.grid.length) {
      fetchUserUploadedPhotos();
    }
  }, [fetchUserUploadedPhotos, photoGrid]);

  const onPhotoGridUpdate = async (images: Array<GridImage>) => {
    const response = await createOrUpdateUserPhotoGrid({ grid: images });

    if (response.grid) {
      notification.success({
        message: 'Successfully updated the photo grid',
      });
      setPhotoGrid(response);
      setIsGalleryView(false);
    } else {
      notification.error({
        message: 'Grid update failed',
      });
    }
  };

  const onPhotoGridCreate = async (images: Array<GridImage>) => {
    const response = await createOrUpdateUserPhotoGrid({ grid: images });

    if (response.grid) {
      notification.success({
        message: 'Successfully created the photo grid',
      });
      setPhotoGrid(response);
      setIsGalleryView(false);
    } else {
      notification.error({
        message: 'Grid creation failed',
      });
    }
  };

  return (
    <div className="dashboard">
      {!isGalleryView && photoGrid && (
        <PhotoGrid
          photos={uploadedPhotos}
          userGrid={photoGrid}
          onSave={onPhotoGridUpdate}
          onCreateNewGrid={() => setIsGalleryView(true)}
        />
      )}
      {isGalleryView && (
        <Gallery
          photos={uploadedPhotos}
          onSave={onPhotoGridCreate}
          photoGridExists={photoGrid ? true : false}
          onBack={() => setIsGalleryView(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
