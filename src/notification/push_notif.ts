import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { AppState, Platform } from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNNotificationCall from 'react-native-full-screen-notification-incoming-call';

import { callKitDisplay, setCallDisplay } from './callkit_service';

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
        const phoneNumber = (remoteMessage.data.nameCaller as string) ?? '';
        const uuid = (remoteMessage.data.uuid as string) ?? '';
        setCallDisplay(true);
        callKitDisplay(phoneNumber, uuid);
      }
      break;
    case 'CANCEL_ALL':
    case 'CANCEL_GROUP':
      RNCallKeep.endAllCalls();
      RNNotificationCall.hideNotification();
      setCallDisplay(false);
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

      handleNotification(remoteMessage);
    }
  );

  if (AppState.currentState != 'active' && Platform.OS == 'android') {
    RNNotificationCall.addEventListener('answer', async () => {
      await AsyncStorage.setItem('ACCEPT_CALL', 'TRUE');
      RNNotificationCall.backToApp();
    });
  }
};
