import axios from 'axios';

export async function UploadUserImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await axios.post('http://localhost:8080/api/v2/storage/image/user-profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) {
            return response.data.image_url;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error('Failed to upload image:', error);
        throw error;
    }
}

export async function UploadQuizImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await axios.post('http://localhost:8080/api/v2/storage/image/quiz-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) {
            return response.data.image_url;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error('Failed to upload image:', error);
        throw error;
    }
}
