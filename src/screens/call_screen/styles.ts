import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
  },
  headerCallInfo: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  callInfoContainer: {
    alignItems: 'center',
  },
  txtDirection: {
    fontSize: 16,
    fontWeight: '600',
  },
  txtPhoneNumber: {
    fontSize: 24,
    fontWeight: '600',
  },
  txtTimer: {
    fontSize: 14,
    fontWeight: '400',
  },

  //
  incomingCall: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: width * 0.15,
  },
  acceptCall: {
    backgroundColor: 'green',
  },

  //
  groupBtnAction: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  advancedBtnGroup: {
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingTop: 8,
    opacity: 0.8,
    marginBottom: 20,
  },
  btnCall: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
