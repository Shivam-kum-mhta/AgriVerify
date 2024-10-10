import { ethers } from 'ethers';
import * as PushAPI from "@pushprotocol/restapi";
// Define the signer (wallet) to sign and send the notification
const privateKey = '1ee3c774ec7e62bfeb71d867fc205fa80d8ba363dc56804932ce71c7516ee9dd'; // Replace with your private key
const signer = new ethers.Wallet(privateKey);

async function sendPushNotification() {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer, // Pass the wallet signer
      type: 3, // Targeted notification (to a specific address)
      identityType: 2, // Direct payload (without encryption)
      notification: {
        title: `[SDK-TEST] Notification Title`,
        body: `[SDK-TEST] Notification Body`
      },
      payload: {
        title: `[SDK-TEST] Payload Title`,
        body: `This is the message body of the notification`,
        cta: '', // Optional call to action URL
        img: '' // Optional image URL for the notification
      },
      recipients: 'eip155:11155111:0xD94348AE0372161D4c3E9862c906697FdC30eb55', // Recipient's address (on Sepolia)
      channel: 'eip155:11155111:0x63b1A4aE31409221fD0e9272b49D490CB52960bb', // Channel address (on Sepolia)
      env: 'staging' // Specify 'staging' environment for testing
    });

    console.log('Notification sent successfully:', apiResponse);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

// Call the function to send the notification
sendPushNotification();
