// theme.js
import { Colors, Typography } from 'react-native-ui-lib';

Colors.loadColors({
  primary: '#6200EE',
  secondary: '#03DAC6',
  white: '#FFFFFF',
});

Typography.loadTypographies({
  text60: { fontSize: 18, fontWeight: '500' },
});

export default {
  Colors,
  Typography,
};
