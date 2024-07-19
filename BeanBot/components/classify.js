import * as ImageManipulator from 'expo-image-manipulator';

export const classifyImage = async (imagePath) => {
    try {
      // Resize the image to 640x640 using ImageManipulator
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        imagePath,
        [{ resize: { width: 640, height: 640 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
  
      // Perform classification on the resized image
      const results = await classifier.recognize({
        image: manipulatedImage.uri, // The resized image path
        inputShape: 224, // The input shape of your model. If none given, it will default to 224.
      });
  
      const resultObj = {
        name: "Name: " + results[0].name,
        confidence: "Confidence: " + results[0].confidence,
        inference: "Inference: " + results[0].inference + "ms"
      };
      setModalData(resultObj); // Update your state or modal data
      setModalVisible(true); // Display the modal with results
    } catch (err) {
      alert(err.message);
    }
  };
  