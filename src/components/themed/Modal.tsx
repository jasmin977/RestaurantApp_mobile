import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ScreenHeigh, ScreenWidth } from '../common/containers/Backgound';
import { useTheme } from '../../hooks';
import { RNIcon } from '.';
import { CloseIcon } from '../../assets';

interface TransitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const RNModal: React.FC<TransitionModalProps> = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const { theme } = useTheme();
  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };
  const modalContentStyle = [
    styles.modalContent,
    {
      backgroundColor: theme.colors.card,
    },
  ];

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={modalContentStyle}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <RNIcon as={<CloseIcon />} outline color="onBackground" size={40} />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 20,
    paddingTop: 50,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    width: ScreenWidth,
    height: ScreenHeigh / 2,
    bottom: 0,
    position: 'absolute',
  },

  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});

export default RNModal;
