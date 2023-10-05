// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Image, PermissionsAndroid, Platform } from 'react-native';
// import TextDetector from 'react-native-text-detector';
// import { Camera } from "expo-camera";

// const FrontPageScan = () => {
//   const [imageUri, setImageUri] = useState(null);
//   const [detectedText, setDetectedText] = useState('');
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     requestCameraPermission();
//   }, []);

//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: 'Camera Permission',
//             message: 'App needs access to your camera.',
//           }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('Camera permission granted');
//         } else {
//           console.log('Camera permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     }
//   };

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const options = { quality: 0.5, base64: true };
//       const data = await cameraRef.current.takePictureAsync(options);
//       setImageUri(data.uri);
//       detectText(data.uri);
//     }
//   };

//   const detectText = async (uri) => {
//     try {
//       const visionResp = await TextDetector.detectFromUri(uri);
//       let text = '';
//       for (let i = 0; i < visionResp.length; i++) {
//         text += visionResp[i].text + ' ';
//       }
//       setDetectedText(text);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Camera
//         ref={cameraRef}
//         style={{ width: 300, height: 300 }}
//         captureAudio={false}
//       />
//       <TouchableOpacity onPress={takePicture} style={{ marginTop: 10 }}>
//         <Text>Capture Image</Text>
//       </TouchableOpacity>
//       {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />}
//       {detectedText !== '' && (
//         <Text style={{ marginTop: 20 }}>
//           Detected Text: {detectedText}
//         </Text>
//       )}
//     </View>
//   );
// };
// export default FrontPageScan;

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import TesseractOcr, {
  LANG_ENGLISH,
  LEVEL_WORD,
} from "react-native-tesseract-ocr";

const FrontPageScan = () => {
  const [imageUri, setImageUri] = useState(null);
  const [detectedText, setDetectedText] = useState("");
  const cameraRef = useRef(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs access to your camera.",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera permission granted");
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImageUri(data.uri);
      detectText(data.uri);
    }
  };

  const detectText = async (uri) => {
    try {
      const ocrResult = await TesseractOcr.recognize(uri, LANG_ENGLISH, {
        level: LEVEL_WORD,
      });
      setDetectedText(ocrResult);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Camera
        ref={cameraRef}
        style={{ width: 300, height: 300 }}
        captureAudio={false}
      />
      <TouchableOpacity onPress={takePicture} style={{ marginTop: 10 }}>
        <Text>Capture Image</Text>
      </TouchableOpacity>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}
      {detectedText !== "" && (
        <Text style={{ marginTop: 20 }}>Detected Text: {detectedText}</Text>
      )}
    </View>
  );
};
export default FrontPageScan;

// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import TesseractOcr, { LANG_ENGLISH } from 'react-native-tesseract-ocr';

// const FrontPageScan = () => {
//   const [imagePath, setImagePath] = useState('');
//   const [extractedText, setExtractedText] = useState('');

//   const requestCameraPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Camera Permission',
//           message: 'This app needs access to your camera to take pictures.',
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Camera permission granted');
//       } else {
//         console.log('Camera permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   const openCamera = async () => {
//     await requestCameraPermission();

//     const options = {
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     ImagePicker.launchCamera(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         setImagePath(response.uri);
//         recognizeText(response.path);
//       }
//     });
//   };

//   const recognizeText = async (imagePath) => {
//     try {
//       const recognizedText = await TesseractOcr.recognize(
//         imagePath,
//         LANG_ENGLISH,
//         {},
//       );
//       setExtractedText(recognizedText);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       {imagePath ? (
//         <Image source={{ uri: imagePath }} style={{ width: 200, height: 200 }} />
//       ) : (
//         <Text>No image selected</Text>
//       )}

//       <TouchableOpacity onPress={openCamera}>
//         <Text>Select Image from Camera</Text>
//       </TouchableOpacity>

//       {extractedText ? (
//         <View style={{ marginTop: 20 }}>
//           <Text>Extracted Text:</Text>
//           <Text>{extractedText}</Text>
//         </View>
//       ) : null}
//     </View>
//   );
// };

// export default FrontPageScan;
