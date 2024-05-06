// const {v5: uuidv5} = require('uuid');
import {v5 as uuidv5} from 'uuid';

export function generateUuidFromFirebaseUid(firebaseUid) {
  // Convert Firebase UID to UUID using namespace OID
  const namespace = '6ba7b812-9dad-11d1-80b4-00c04fd430c8'; // Namespace OID
  const uuid = uuidv5(firebaseUid, namespace);
  return uuid;
}

// Function to format CNIC input
export function formatCnic(input) {
  // CNIC formatting logic
  const formattedCnic = input
    .replace(/\D/g, '') // Remove non-numeric characters
    .replace(/(\d{5})(\d{7})(\d{1})/, '$1-$2-$3'); // Format as XXXXX-XXXXXXX-X
  return formattedCnic;
}

export function catListChangeToSmallCase(categoryList) {
  return categoryList.map(category =>
    category
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/^\w/, c => c.toUpperCase()),
  );
}

export function calculateElapsedTimeInDays(createdAt) {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const elapsedTimeInMillis = currentDate - createdDate;
  const elapsedTimeInDays = elapsedTimeInMillis / (1000 * 60 * 60 * 24); // Convert milliseconds to days
  return Math.floor(elapsedTimeInDays);
}
