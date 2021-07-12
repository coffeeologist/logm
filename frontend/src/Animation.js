import { bounceOutUp, bounceInDown, fadeIn } from 'react-animations';
import { StyleSheet } from 'aphrodite';

export const styles = StyleSheet.create({
  bounceInDown_08: {
    animationName: bounceInDown,
    animationDuration: '0.8s'
  },

  bounceInDown_12: {
    animationName: bounceInDown,
    animationDuration: '1.2s'
  },

  bounceOutUp_08: {
    animationname: bounceOutUp,
    animationDuration: '0.8s'
  },

  fadeIn_08: {
    animationName: fadeIn,
    animationDuration: '0.8s'
  }
});
