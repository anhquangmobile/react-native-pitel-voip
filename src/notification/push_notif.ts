import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { AppState, Platform } from 'react-native';
import RNCallKeep, { IOptions } from 'react-native-callkeep';

import { callKitDisplay } from './callkit_service';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    return true;
  } else {
    return false;
  }
}

export async function getFcmToken() {
  try {
    if (await requestUserPermission()) {
      const fcmToken = await messaging().getToken();
      return fcmToken;
    }
    return 'Empty';
  } catch (error) {
    return '';
  }
}

function handleNotification(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage
) {
  switch (remoteMessage?.data?.callType) {
    case 'CALL':
      if (remoteMessage.data != null) {
        const phoneNumber = remoteMessage.data.nameCaller ?? '';
        // const uuid = remoteMessage.data.uuid ?? '';
        callKitDisplay(phoneNumber);
      }
      break;
    case 'CANCEL_ALL':
    case 'CANCEL_GROUP':
      // if (remoteMessage.data.uuid) {
      //   RNCallKeep.endCall(remoteMessage.data.uuid);
      // }
      RNCallKeep.endAllCalls();
      break;
  }
}

export const NotificationListener = () => {
  messaging().onNotificationOpenedApp(
    (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification
      );
      // handleNotification(remoteMessage);
    }
  );

  messaging()
    .getInitialNotification()
    .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification
        );
      }
    });
  messaging().onMessage(
    async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('notification on foreground...', remoteMessage);
      handleNotification(remoteMessage);
    }
  );
};

export const NotificationBackground = () => {
  messaging().setBackgroundMessageHandler(
    async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
      const options: IOptions = {
        ios: {
          appName: 'rn_pitel_demo',
        },
        android: {
          alertTitle: 'Permissions required',
          alertDescription:
            'This application needs to access your phone accounts',
          cancelButton: 'Cancel',
          okButton: 'ok',
          foregroundService: {
            channelId: 'com.pitel.pitelconnect.dev',
            channelName: 'Foreground service for my app',
            notificationTitle: 'My app is running on background',
            notificationIcon: 'Path to the resource icon of the notification',
          },
          additionalPermissions: [],
        },
      };
      RNCallKeep.registerPhoneAccount(options);
      RNCallKeep.registerAndroidEvents();
      RNCallKeep.setAvailable(true);
      handleNotification(remoteMessage);
    }
  );

  if (AppState.currentState != 'active' && Platform.OS == 'android') {
    RNCallKeep.addEventListener('answerCall', async () => {
      for (var i = 0; i < 10; i++) {
        RNCallKeep.backToForeground();
      }
      RNCallKeep.removeEventListener('answerCall');
    });
  }
};