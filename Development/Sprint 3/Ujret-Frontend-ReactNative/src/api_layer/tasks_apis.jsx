// Task_apis.jsx
import {BASE_URL, handleResponse} from './user_apis';

// Create a new task API call
const createTask = async taskDetails => {
  console.log('Create Task API call, ', {
    uid: taskDetails.uid,
    category: taskDetails.category.toUpperCase(),
    sub_categories: taskDetails.subCategories
      .toUpperCase()
      .replace(/ /g, '_')
      .split(','), //"WATER_LINE_REPAIR,DRAIN_CLEANING",
    description: taskDetails.description,
    address: taskDetails.address,
    budget: taskDetails.budget,
    duration: taskDetails.duration,
  });

  try {
    const apiResponse = await fetch(`${BASE_URL}/create-task`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: taskDetails.uid,
        category: taskDetails.category.toUpperCase(),
        sub_categories: taskDetails.subCategories
          .toUpperCase()
          .replace(/ /g, '_') //"WATER_LINE_REPAIR,DRAIN_CLEANING",
          .split(','), //["WATER_LINE_REPAIR","DRAIN_CLEANING"],
        description: taskDetails.description,
        address: taskDetails.address,
        budget: taskDetails.budget,
        duration: taskDetails.duration,
      }),
    });

    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    throw error;
  }
};

// Fetch Task Bids Api
const getThisTaskBids = async taskId => {
  try {
    const apiResponse = await fetch(
      `${BASE_URL}/get-task-bids?task_id=${taskId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    throw error;
  }
};

// Accept Bids
const acceptTaskBid = async bidId => {
  try {
    const apiResponse = await fetch(`${BASE_URL}/accept-bid?bid_id=${bidId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    throw error;
  }
};

// Decline Bids
const declineTaskBid = async bidId => {
  try {
    const apiResponse = await fetch(`${BASE_URL}/decline-bid?bid_id=${bidId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    throw error;
  }
};

const getRelevantTasks = async categoriesList => {
  try {
    const apiResponse = await fetch(
      `${BASE_URL}/get-relevant-available-tasks`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({category_list: categoriesList}),
      },
    );
    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    // console.error('Error in getRelevantTasks:', error);
    throw error;
  }
};

// Mark Task Completed Api Function
const markTaskCompleted = async (taskId, userId) => {
  try {
    const apiResponse = await fetch(`${BASE_URL}/user-mark-task-completed`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({task_id: taskId, user_id: userId}),
    });

    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    throw error;
  }
};

// Create bid
const createBidTask = async bidDetails => {
  const {amount, description, handymanId, taskId} = bidDetails;
  console.log('Create Bid API call, ', {
    amount,
    description,
    handymanId,
    taskId,
  });
  try {
    const apiResponse = await fetch(`${BASE_URL}/bid-task`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        description: description,
        task_id: taskId,
        handyman_id: handymanId,
      }),
    });

    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    throw error;
  }
};

// Check Bid status
// {{URL}}/check-bid-status?bid_id=0c251ef9-52f0-4ffc-b5b0-48ddf8f5746e/
const checkThisBidStatus = async bidId => {
  try {
    const apiResponse = await fetch(
      `${BASE_URL}/check-bid-status?bid_id=${bidId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    throw error;
  }
};

// {{URL}}/check-task-status?task_id=8b2b1dcc-d406-439f-9f1e-da306e84429e
// Check Task status
const checkThisTaskStatus = async taskId => {
  try {
    const apiResponse = await fetch(
      `${BASE_URL}/check-task-status?task_id=${taskId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    throw error;
  }
};

// Exports
export {
  createTask,
  getThisTaskBids,
  acceptTaskBid,
  declineTaskBid,
  getRelevantTasks,
  markTaskCompleted,
  createBidTask,
  checkThisBidStatus,
  checkThisTaskStatus,
};
