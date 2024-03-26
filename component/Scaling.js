import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

const scale = (size, lastWidth) => (width / lastWidth) * size;
const verticalScale = (size, lastHeight) => (height / lastHeight) * size;
const moderateScale = (size, factor = 0.5, lastWidth) =>
  size + (scale(size, lastWidth) - size) * factor;

export {scale, verticalScale, moderateScale};
