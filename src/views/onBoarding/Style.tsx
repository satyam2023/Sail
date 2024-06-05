import fonts from '@fonts';
import { Colors } from 'commonStyles/RNColor.style';
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface IOnBoardingStyle{
  imghand:ViewStyle;
  toptxt: TextStyle;
  imgsail:ImageStyle;
  lowertxt:TextStyle;
  toptxtcontainer:ViewStyle;
}

const styles = StyleSheet.create<IOnBoardingStyle>({
  imghand: {
    alignSelf: 'center',
    flex:0.3,
    resizeMode:'contain'
  },
  toptxt: {
    color: Colors.sailBlue,
    textAlign: 'center',
    fontSize: 24,
    fontFamily:fonts.Poppins.semiBold,
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
    fontFamily: fonts.Poppins.regular,
  },
  toptxtcontainer: {
    marginTop: 16,
    width:263,
  },
});

export default styles;
