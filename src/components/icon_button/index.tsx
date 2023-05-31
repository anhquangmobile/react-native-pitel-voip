import React, { ReactNode } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import styles from './styles';

type Props = {
  icon: ReactNode;
  onPress: () => void;
  style?: ViewStyle;
};

export const IconButton: React.FC<Props> = ({ icon, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { ...style }]}
    >
      {icon}
    </TouchableOpacity>
  );
};
