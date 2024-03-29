import { Counter } from './components/counter';
import { PitelCallOut } from './components/pitel_call_out';
import { PitelCallNotif } from './components/pitel_call_notif';
import { PitelSDK } from './components/pitel_sdk';
import { PitelCallKit } from './screens/call_screen';
import { pitelRegister } from './services/pitel_register';
import { useRegister } from './hooks/register_hook';
import {
  getFcmToken,
  NotificationListener,
  NotificationBackground,
} from './notification/push_notif';
import { registerDeviceToken, removeDeviceToken } from './api/login_device';
import { PitelSDKProvider, PitelSDKContext } from './context/pitel_sdk_context';

export {
  Counter,
  PitelCallOut,
  PitelCallKit,
  PitelCallNotif,
  PitelSDK,
  pitelRegister,
  useRegister,

  // push notif
  getFcmToken,
  NotificationListener,
  NotificationBackground,

  // Register Device Token
  registerDeviceToken,
  removeDeviceToken,

  // Context
  PitelSDKProvider,
  PitelSDKContext,
};
