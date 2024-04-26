import fonts from '@fonts';
import { Colors } from 'commonStyles/RNColor.style';
import { ScreenHeight } from 'libs';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  imghand: {
    alignSelf: 'center',
    flex:0.3,
    resizeMode:'contain'
  },
  toptxt: {
    color: Colors.sailBlue,
    textAlign: 'center',
    fontSize: 24,
    fontFamily:fonts.type.semiBold,
    letterSpacing: 0.24,
  },
  imgsail: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  lowertxt: {
    color: Colors.jetGray,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: fonts.type.regular,
  },
  toptxtcontainer: {
    marginTop: 16,
    width:263,
  },
});

export default styles;
