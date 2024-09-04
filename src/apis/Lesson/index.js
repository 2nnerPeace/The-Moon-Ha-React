import instance from '..';

export const LessonRegisterAPI = (lessonRegister, thumbnailFile, videoFile) => {
    const formData = new FormData();
    formData.append('registerRequest', new Blob([JSON.stringify(lessonRegister)], { type: 'application/json' }));
    formData.append('thumbnailFile', thumbnailFile);
    formData.append('previewVideoFile', videoFile);

    return instance.post('/admin/lesson/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const ShoreFormRegisterAPI = (shortFormRegister, videoFile) => {
    const formData = new FormData();
    formData.append('registerRequest', new Blob([JSON.stringify(shortFormRegister)], { type: 'application/json' }));
    formData.append('shortFormVideoFile', videoFile);

    return instance.post('/admin/shortform/register', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
