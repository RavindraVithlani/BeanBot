import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { pulseDataFiles } from './data';
const ResultModal = ({ visible, data, onClose }) => {

  const handleReadMore = () => {
    router.navigate(`class/${data.className}`);
  };

  const handleOtherNames = () => {
    router.navigate(`class/${data.className}/names`);
  };
 
  return(
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{pulseDataFiles[data.className]?.name}</Text>
            <Text style={styles.description}>
              {pulseDataFiles[data.className]?.general?.Description}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleReadMore}>
                <Text style={styles.buttonText}>Read More</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleOtherNames}>
                <Text style={styles.buttonText}>Other Names</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onClose}>
                <View style={styles.back}>
                    <MaterialIcons name="close" size={14} />
                    <Text style={styles.backText}> Close</Text>
                </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      width: '100%',
      backgroundColor: 'white',
      borderTopRightRadius: 25,
      borderTopLeftRadius:25,
      overflow: 'hidden',
    },
    contentContainer: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    description: {
      fontSize: 18,
      marginBottom: 20,
      lineHeight:30,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: '#6200ea',
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
      width: '45%',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        margin:20,
    },
    backText: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize:14,
    },
  });
  
  export default ResultModal;