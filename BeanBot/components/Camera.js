import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Link } from 'expo-router';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ToastAndroid } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import ResultModal from './ResultModal';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [torch,setTorch] = useState(false)
  const cameraRef = useRef(null)
  const [image,setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ className: '', confidence: 0, imageUri: '' });
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
    camera: {
      width: '100%',
      aspectRatio: 1,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 50,
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
    galBut: {
      position: 'absolute',
      left: 20,
      padding: 10
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    
    link: {
      position: "absolute",
      top: 20,
      right: 20,
      padding: 10,
      borderRadius: 10,
      alignSelf: 'flex-start',
    },
    linkContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    linkText: {
      color: "white",
      fontWeight: "bold",
      marginLeft: 10,
      fontSize: 15,

    }
  });

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', color:'white' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleTorch(){
    setTorch(!torch);
  }
  const selectImage = async()=>{
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      let uri = result.assets[0].uri
      try{
        await uploadImage(uri);
      }catch(e){
        console.log(e);
      }
    }
    else{
      setImage(null);
    }
    console.log(result);
  };

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
    setLoading(true);
    const apiUrl = 'http://10.20.54.109:5000/predict'; // Replace with server URL
    const formData = new FormData();

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
          ToastAndroid.show("Sorry, unable to detect right now!", ToastAndroid.LONG);
          setImage(null);
        } else {
          const { class_name, confidence } = responseData.result;
          if (confidence > 0.4) {
            setModalData({ className: class_name, confidence: confidence });
            setModalVisible(true);
          } else {
            ToastAndroid.show(`Confidence too low to provide details.${class_name}, ${confidence}`, ToastAndroid.LONG);
            setImage(null);
          }
        }
      } else {
        console.log('Image upload failed', response);
      }
    } catch (error) {
      console.log('Error uploading image', error);
      ToastAndroid.show("Error uploading image", ToastAndroid.LONG);
      setImage(null);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <>
    <View style={styles.container}>
      {image?<>
      <Image source={{uri: image}} style={styles.camera}/>
      <Link replace href={`/camera`} style={styles.link}>
        <View style={styles.linkContent}>
          <MaterialIcons name="cameraswitch" size={20} color="white" />
          <Text style={styles.linkText}>Retake</Text>
        </View>
      </Link>

      <Link replace href={`/`} style={{...styles.link, left: 20, right: null}}>
        <View style={styles.linkContent}>
          <MaterialIcons name="home" size={20} color="white" />
          <Text style={styles.linkText}>Home</Text>
        </View>
      </Link>
      
      {loading &&
        <View>
          <ActivityIndicator size="large" color="white" />
        </View>
      }
      </>
      
      :
      <>
      <CameraView style={styles.camera} enableTorch={torch} ref={cameraRef} ratio={'1:1'}/>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <MaterialIcons name="circle" size={70} color="white" onPress={takePicture}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.torchBut} onPress={toggleTorch}>
            {!torch?<MaterialIcons name="flashlight-off" size={25} color="white" />:<MaterialIcons name="flashlight-on" size={24} color="black"/>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.galBut} onPress={selectImage}>
            <Ionicons name="images" size={24} color="white" />
            
          </TouchableOpacity>
      </View>
    </>
    }
      <ResultModal
        visible={modalVisible}
        data={modalData}
        onClose={() => setModalVisible(false)}
      />
    </View>
    </>
  );
}

