// Reviews API
import {BASE_URL, handleResponse} from './user_apis';

// {{URL}}/add-review
const addReview = async reviewDetails => {
  try {
    const apiResponse = await fetch(`${BASE_URL}/add-review`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        handyman_id: reviewDetails.handymanId,
        user_id: reviewDetails.userId,
        rating: reviewDetails.rating,
        review: reviewDetails.review,
      }),
    });

    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    throw error;
  }
};

export {addReview};
