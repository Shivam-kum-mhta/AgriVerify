import { Wallet } from 'ethers';
import * as PushAPI from '@pushprotocol/restapi';

// Function to get the current time
const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString(); // This will give you the time in the format HH:MM:SS AM/PM
};

async function sendPushNotification(recipient, crop) {
  const privateKey = import.meta.env.VITE_PRIVATE_KEY;
  // Load private key from environment variables
  const signer = new Wallet(privateKey);

  console.log('PushAPI object:', PushAPI); // Log the PushAPI object

  const currentTime = getCurrentTime(); // Get the current time for the notification

  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer, // Pass the wallet signer
      type: 3, // Targeted notification (to a specific address)
      identityType: 2, // Direct payload (without encryption)
      notification: {
        title: `Crop Certification`,
        body: `Your Crop ${crop} has been certified at ${currentTime}.` // Include the current time in the body
      },
      payload: {
        title: `Crop Certification`,
        body: `Your Crop ${crop} has been successfully certified at ${currentTime}.`, // Include the current time in the payload body
        cta: '', // Optional call to action URL
       
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb6YvE3KzJ-LhlKOQwOAirNfUSRW--X5wOKQ&s' // URL to the small, rounded icon (replace with the actual URL of the icon)
      },
      recipients: `eip155:11155111:${recipient}`, // Recipient's address (on Sepolia)
      channel: 'eip155:11155111:0x63b1A4aE31409221fD0e9272b49D490CB52960bb', // Channel address (on Sepolia)
      env: 'staging' // Specify 'staging' environment for testing
    });

    console.log('Notification sent successfully:', apiResponse);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

export default sendPushNotification;
