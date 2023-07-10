import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

interface ToastProps {
  title: string;
  description: string;
  duration: number;
  onClose: () => void;
}
const RNToast = ({ title, description, duration, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  // Hide the toast after the specified duration
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);
  if (!visible) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={() => setVisible(false)}>
      <View style={styles.toast}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  toast: {
    backgroundColor: 'rgba(202, 115, 15, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
});
export default RNToast;
