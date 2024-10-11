import { ethers } from 'ethers';
import * as PushAPI from "@pushprotocol/restapi";
// Define the signer (wallet) to sign and send the notification
const privateKey = 'my-wallet-private-key' // Replace with your private key
const signer = new ethers.Wallet(privateKey);
// Subscribe user to Push Protocol

const subscribeToNotifications = async () => {
  try {
    const subscriptions = await PushAPI.channels.subscribe({
      signer: signer, // Use the signer initialized above
      channelAddress: 'eip155:11155111:0x63b1A4aE31409221fD0e9272b49D490CB52960bb', // Channel address (on Sepolia)
      userAddress:  'eip155:11155111:0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', // Recipient's address (on Sepolia)
      env: 'staging', // Use 'staging' for testing
    });

    console.log('Subscribed to Push Notifications: ', subscriptions);
  } catch (error) {
    console.error('Error subscribing to Push Notifications:', error);
  }
};

// Call the subscription function
subscribeToNotifications();



// Call the subscription function
subscribeToNotifications();

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
      recipients: 'eip155:11155111:0x1379Dc6a08c7a57654D0f123fD1D897307d0fF4D', // Recipient's address (on Sepolia)
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
