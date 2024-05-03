// Utilities for the application
import { v5 as uuidv5 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

// Function to generate a UUID
export function generateUuid() {
  return uuidv4();
}

export function generateUuidFromFirebaseUid(firebaseUid) {
  // Convert Firebase UID to UUID using namespace OID
  const namespace = '6ba7b812-9dad-11d1-80b4-00c04fd430c8'; // Namespace OID
  const uuid = uuidv5(firebaseUid, namespace);
  return uuid;
}

// // Function to format CNIC input
// export function formatCnic(input) {
//   // CNIC formatting logic
//   const formattedCnic = input
//     .replace(/\D/g, '') // Remove non-numeric characters
//     .replace(/(\d{5})(\d{7})(\d{1})/, '$1-$2-$3'); // Format as XXXXX-XXXXXXX-X
//   return formattedCnic;
// }
