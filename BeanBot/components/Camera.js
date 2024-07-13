import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ToastAndroid } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import ResultModal from './ResultModal';


export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [torch,setTorch] = useState(false)
  const cameraRef = useRef(null)
  const [image,setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ className: '', confidence: 0, imageUri: '' });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 60,
      left: 20,
      right: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      padding: 2,
      borderRadius: 50, 
      borderWidth: 2, 
      borderColor: '#ccc', 
    },
    torchBut:{
      position:'absolute',
      right:20,
      backgroundColor:torch?'white':'rgba(234,237,237,0.15)',
      borderRadius:100,
      padding:10,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleTorch(){
    setTorch(!torch);
  }

  const takePicture =async ()=>{
    if (cameraRef) {
      try{
        
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
        console.log(data);
        await uploadImage(data.uri);
      } catch(e) {
        console.log(e);
      }
    }
  }





  const uploadImage = async (uri) => {
    const apiUrl = 'http://10.0.2.2:5000/predict'; // Replace with your server URL
    const formData = new FormData();

    // Convert image to base64
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Add file to FormData
    formData.append('file', {
      uri: uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Image uploaded successfully', responseData);
        if (responseData === -1) {
          ToastAndroid.show("Sorry, unable to detect right now!", ToastAndroid.SHORT);
        } else {
          const { class_name, confidence } = responseData.result;
          if (confidence > 0.4) {
            setModalData({ className: class_name, confidence: confidence });
            setModalVisible(true);
          } else {
            ToastAndroid.show("Confidence too low to provide details.", ToastAndroid.SHORT);
          }
        }
      } else {
        console.log('Image upload failed', response);
      }
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };




  
  return (
    <View style={styles.container}>
      {image?<>
      <Image source={{uri: image}} style={styles.camera}/>
      </>
      
      :<CameraView style={styles.camera} enableTorch={torch} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <MaterialIcons name="circle" size={70} color="white" onPress={takePicture}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.torchBut} onPress={toggleTorch}>
            {!torch?<MaterialIcons name="flashlight-off" size={25} color="white" />:<MaterialIcons name="flashlight-on" size={24} color="black"/>}
          </TouchableOpacity>
        </View>
      </CameraView>}
      <ResultModal
        visible={modalVisible}
        data={modalData}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

