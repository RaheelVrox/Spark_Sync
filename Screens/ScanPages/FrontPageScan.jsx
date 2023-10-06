// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   PermissionsAndroid,
//   Platform,
// } from "react-native";
// import { Camera } from "expo-camera";
// import TesseractOcr, {
//   LANG_ENGLISH,
//   LEVEL_WORD,
// } from "react-native-tesseract-ocr";

// const FrontPageScan = () => {
//   const [imageUri, setImageUri] = useState(null);
//   const [detectedText, setDetectedText] = useState("");
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     requestCameraPermission();
//   }, []);

//   const requestCameraPermission = async () => {
//     if (Platform.OS === "android") {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: "Camera Permission",
//             message: "App needs access to your camera.",
//           }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           console.log("Camera permission granted");
//         } else {
//           console.log("Camera permission denied");
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

//   // const detectText = async (uri) => {
//   //   try {
//   //     const ocrResult = await TesseractOcr?.recognize(uri, LANG_ENGLISH, {
//   //       level: LEVEL_WORD,
//   //     });
//   //     setDetectedText(ocrResult);
//   //   } catch (e) {
//   //     console.error(e);
//   //   }
//   // };

//   const detectText = async (uri) => {
//     console.log("uri", uri);
//     try {
//       console.log("Detecting text...");
//       const ocrResult = await TesseractOcr?.recognize(uri, LANG_ENGLISH, {
//         level: LEVEL_WORD,
//       });
//       console.log("OCR Result:", ocrResult); // Log the OCR result
//       setDetectedText(ocrResult);
//     } catch (e) {
//       console.error("Error in text detection:", e);
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Camera
//         ref={cameraRef}
//         style={{ width: 300, height: 300 }}
//         captureAudio={false}
//       />
//       <TouchableOpacity onPress={takePicture} style={{ marginTop: 10 }}>
//         <Text>Capture Image</Text>
//       </TouchableOpacity>
//       {imageUri && (
//         <Image
//           source={{ uri: imageUri }}
//           style={{ width: 200, height: 200, marginTop: 20 }}
//         />
//       )}
//       {detectedText !== "" && (
//         <Text style={{ marginTop: 20 }}>Detected Text: {detectedText}</Text>
//       )}
//     </View>
//   );
// };
// export default FrontPageScan;

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import TesseractOcr, { LANG_ENGLISH } from "react-native-tesseract-ocr";

const FrontPageScan = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [detectedText, setDetectedText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Initialize TesseractOcr when the app starts
    initializeTesseract();
  }, []);

  const initializeTesseract = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.MEDIA_LIBRARY
    );

    if (status === "granted") {
      TesseractOcr.initialize();
    } else {
      console.warn("Camera and media library permissions not granted.");
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Camera permission not granted");
      }

      const { status: mediaStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaStatus !== "granted") {
        alert("Media Library permission not granted");
      }
    })();
  }, []);

  const takePicture = async () => {
    if (!isCameraOpen) return;

    const photo = await ImagePicker.launchCameraAsync({});

    if (!photo.canceled) {
      setSelectedImage(photo.uri);
      recognizeText(photo.uri);
    }
  };

  const recognizeText = async (imageUri) => {
    try {
      const result = await TesseractOcr.recognize(imageUri, LANG_ENGLISH);
      setDetectedText(result || "No text detected");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {isCameraOpen ? (
        <Camera
          style={{ flex: 1, justifyContent: "center" }}
          type={Camera.Constants.Type.back}
        >
          <TouchableOpacity onPress={takePicture}>
            <View>
              <Text
                style={{ color: "#fff", alignSelf: "center", fontSize: 16 }}
              >
                Take Picture
              </Text>
            </View>
          </TouchableOpacity>
        </Camera>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Text>{detectedText}</Text>
          <TouchableOpacity onPress={() => setIsCameraOpen(true)}>
            <Text>Open Camera</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FrontPageScan;
