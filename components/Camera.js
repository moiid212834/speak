'use strict';
import React, { PureComponent, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Permissions from 'react-native-permissions';

const CameraApp = () => {
    let [flash, setFlash] = useState('off')
    let [zoom, setZoom] = useState(0)
    let [autoFocus, setAutoFocus] = useState('on')
    let [depth, setDepth] = useState(0)
    let [type, setType] = useState('back')
    let [permission, setPermission] = useState('undetermined')
    let cameraRef = useRef(null)
    useEffect(() => {
        Permissions.check('photo').then(response => {
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        setPermission(response);
        });
    }, []);

    const toggleFlash = () => {
        setFlash(flashModeOrder[flash])
    }
    const zoomOut = () => {
        setZoom(zoom - 0.1 < 0 ? 0 : zoom - 0.1)
    }
    const zoomIn = () => {    
        setZoom(zoom + 0.1 > 1 ? 1 : zoom + 0.1);
    }
    const takePicture = async() => {
        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(soptions);
            console.log(data.uri);  
        }
    };
    return (
    <>
        <RNCamera
          ref={cameraRef}
          defaultTouchToFocus
          type={type}
          flashMode={flash}
          mirrorImage={false}
          captureAudio={false}
          style={styles.preview}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
    </>
    );
}


const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF', }, preview: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', height: Dimensions.get('window').width, width: Dimensions.get('window').width, }, withLimit: { width: '75%' }, rectangleContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', }, rectangle: { height: 250, width: 250, borderWidth: 2, borderColor: '#00FF00', backgroundColor: 'transparent'} });

export default CameraApp