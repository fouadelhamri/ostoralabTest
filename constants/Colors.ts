const tintColorLight = '#2f95dc';
const lightBlue='#c7ecee';
const tintColorDark = '#fff';
const lightGray='#ffffff';
const redColor="#d63031";
const greenColor="#00b894";
const lightBlack="#2d3436"
export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    gaugeColor:tintColorLight,
    itemBackground:lightGray,
    redText:redColor,
    greenText:greenColor,
    primaryColor:tintColorLight,
    lightBlue:lightBlue,
    deviderColor:lightBlue,
    darkBackground:"#dcdde1"
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#dcdde1',
    tabIconSelected: tintColorDark,
    gaugeColor:tintColorLight,
    itemBackground:lightBlack,
    redText:redColor,
    greenText:greenColor,
    primaryColor:tintColorLight,
    lightBlue:lightBlue,
    deviderColor:lightBlue,
    darkBackground:"#ccc"
  },
};
