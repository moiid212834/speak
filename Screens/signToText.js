'use strict';
import axios from 'axios';
import React, {PureComponent} from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

import
MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';

import tts from 'react-native-tts';


let key=0;
let req_count=0;
class Home extends PureComponent {
    state = {
        translating: false,
        captureBox: {
            height: 100,
            borderRadius: 0
        },
        translateButton: {
            width: "100%",
            padding: 15,
            flex: 1
        },
        stopTranslation: {
            display: 'none'
        },
        sound: {
            isOn: true,
            icon: {
                name: "volume-high"
            }
        },
        focus: {
            borderWidth: 0
        },
        videoFile: {},
        startcamera: false,
        MLresponse: [],
        
    }
    
    componentDidUpdate(prevprops,prevstate){
        console.log(prevstate)
            if(this.state.MLresponse && this.state.MLresponse.length!==0)
                if(prevstate.MLresponse.length !== this.state.MLresponse.length){
                    // this.state.req_count=prevstate.req_count+1;
                    if(this.state.sound.isOn)
                        tts.speak(this.state.MLresponse.slice(-1)[0]);
                }
                        
    }


    render() {
        return (
            <View style={this.styles.container}>
              <RNCamera
                        ref={ref => {
                        this.camera = ref;
                    }}
                    style={this.styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel'
                    }}
                    captureAudio={false}
                />    
                {this.state.startcamera?this.streaming():console.log("camera off")}
                <View
                    style={[
                    this.styles.focus, {
                        borderWidth: this.state.focus.borderWidth
                    }
                ]}></View>
                <View
                    style={[
                    this.styles.captureWrapper, {
                        height: this.state.captureBox.height,
                        borderTopEndRadius: this.state.captureBox.borderRadius,
                        borderTopStartRadius: this.state.captureBox.borderRadius
                    }
                ]}>

                    <TouchableOpacity
                        onPress={
                            this
                            .startRecording
                            .bind(this)}
                        style={[
                        this.styles.capture, {
                            flex: this.state.translateButton.flex,
                            padding: this.state.translateButton.padding,
                            width: this.state.translateButton.width
                        }
                    ]}>
                        <Text
                            style={{
                            fontSize: 14,
                            textAlign: 'center',
                            width: this.state.translateButton.width
                        }}>
                            Translate Now
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={[
                        this.styles.transcriptionWrapper, {
                            display: this.state.stopTranslation.display
                        }
                    ]}>
                        <View style={this.styles.controlsBox}>
                            <TouchableOpacity
                                onPress={
                                    this.state.startcamera? this.stopRecording.bind(this):this.startRecording.bind(this)
                                }
                                style={[this.styles.stopRecord]}>
                                <Text
                                    style={{
                                    color: '#fff'
                                }}>{this.state.startcamera? 'Stop Translation':'Translate'}</Text>
                            </TouchableOpacity>
                            <View style={{display:'flex', flexDirection:'row'}}>
                            <TouchableOpacity style={{marginRight:5}} onPress={this.closeTranslation.bind(this)}>
                                <MaterialCommunityIcons
                                    name='chevron-down'
                                    color='#fff'
                                    size={40}
                                ></MaterialCommunityIcons>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this
                                .toggleSound
                                .bind(this)}>
                                <MaterialCommunityIcons
                                    name={this.state.sound.icon.name}
                                    color={'#fff'}
                                    size={40}></MaterialCommunityIcons>
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={[
                            this.styles.transcriptionBox, {
                                display: this.state.stopTranslation.display
                            }
                        ]}>
                            
                                <View>
                                {this.state.MLresponse && this.state.MLresponse.length!==0?(
                                        <Text
                                            key={key++} 
                                            style={{
                                            color: '#444',
                                            fontWeight: 'bold',
                                            fontSize: 30,
                                            marginRight:10,
                                            }}
                                        >
                                            {this.state.MLresponse.map(text=>{if(text!=='undefined') return text+" "})}
                                        </Text>
                                        ):(
                                            <Text
                                            key={key++} 
                                            style={{
                                            color: '#444',
                                            fontWeight: 'bold',
                                            fontSize: 20,
                                            marginRight:10,
                                            }}
                                        >
                                            Live transcription go here...
                                        </Text>
                                        )}
                                </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    stopRecording = () => {
        this.camera.stopRecording();
        this.setState({
            focus: {
                borderWidth: 0
            },
            startcamera: false,
           
        })
    }

    closeTranslation = () => {
        this.stopRecording();
        this.setState({
            focus: {
                borderWidth: 0
            },
            captureBox: {
                height: 100,
                borderRadius: 0
            },
            translateButton: {
                width: "100%",
                padding: 15,
                flex: 1
            },
            stopTranslation: {
                display: 'none'
            },
            MLresponse:[],
        })
    }

    streaming = () =>{
        const options = {
            quality: RNCamera.Constants.VideoQuality['480p'],
            orientation: 'landscapeLeft',
            maxDuration: 3,
            exposure:0.5,
            whiteBalance:RNCamera.Constants.WhiteBalance.fluorescent,
            }
        this.camera.recordAsync(options).then((value)=>{
            const { uri, codec= "mp4" } = value;    
            let filename = uri.substring(uri.lastIndexOf('/') + 1, uri.length)
            const type = `video/${codec}`;
            let file = {
                uri: uri, 
                type: type, 
                name: filename
            };
            
            this.setState({
                ...this.state,
                videoFile: file,
            })
            this.ApiCall(this.state.videoFile,req_count);
            req_count=req_count+1;
        }).catch((err)=>{console.log("err is: ", err)})
    }

    ApiCall = (file,req_count) =>{
        const ENDPOINT='https://fbd9625e6174.ngrok.io/speak/verify';
        const data = new FormData();
            data.append("vid",file);
            data.append("req_count",req_count)      
            axios({
                method: "post",
                url: ENDPOINT,
                body: data,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: data
            }).then((response) => {
                console.log(response.data)
                this.setState({
                    MLresponse: [...this.state.MLresponse, response.data.gloss]
                })
                
            }, (error) => {
                console.log(error.message);
            });
    }

    startRecording = () => {
        console.log(this.camera.getSupportedRatiosAsync())
        this.setState({
            translating:true,
            captureBox: {
                height: '25%',
                borderRadius: 10
            },
            translateButton: {
                width: 0,
                padding: 0,
                flex: 0
            },
            stopTranslation: {
                display: 'flex'
            },
            focus: {
                borderWidth: 2
            },                
            startcamera: true,
        });
    };

    toggleSound = () => {
       
        if (!this.state.sound.isOn) {
            this.setState({
                sound: {
                    isOn: !this.state.sound.isOn,
                    icon: {
                        name: 'volume-high'
                    }
                }
            })
        } else {
            this.setState({
                sound: {
                    isOn: !this.state.sound.isOn,
                    icon: {
                        name: 'volume-off'
                    }
                }
            })
        }
    }

    styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'black',
            
        },
        preview: {
            flex: 1,
            width: Dimensions.get('window').width,
        },
        capture: {
            backgroundColor: '#fff',
            borderRadius: 5,
            alignSelf: 'center',
            margin: 0
        },
        captureWrapper: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingHorizontal: 20,
            flexDirection: 'row',
            backgroundColor: 'lightblue'
        },
        stopRecord: {
            marginVertical: 20,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: '#fff',
            padding: 10,
            height: 45
        },
        controlsBox: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '30%',
            margin: 0,
            width: '100%',
            paddingHorizontal: 0
        },
        transcriptionBox: {
            height: '50%',
        },
        transcriptionWrapper: {
            flex: 1
        },
        focus: {
            flex: 1,
            flexDirection: 'row',
            position: 'absolute',
            left: 10,
            top: 10,
            width: Dimensions
                .get('window')
                .width - 20,
            height: '71%',
            borderColor: '#fff',
            borderRadius: 20
        }
    });

}

export default Home;