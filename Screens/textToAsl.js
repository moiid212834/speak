import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
    Keyboard
} from 'react-native';

import axios from "axios";

const asl = require('../assets/asl.json');
export default function TextToAsl(props) {
    const [text,
        setText] = useState('');
    const [imgData,
        setImgData] = useState([]);
    function submit() {
        Keyboard.dismiss();
        let formData = new FormData();
        formData.append("text", text)
        axios({
            method: "post",
            url: "http://speak-backend.herokuapp.com/speak/signs",
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: formData
        }).then((response) => {
            console.log(response.data)
            setImgData(response.data);
            console.log(imgData);
        }, (error) => {
            console.log(error.message);
        });
    }
    return (
        <View style={styles.main}>
            <View style={styles.container1}>
                <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Type something"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    onChangeText={text => setText(text)}
                    defaultValue={text}
                    multiline={true}/>
            </View>

            <View style={styles.container2}>
                <TouchableOpacity style={styles.translateButton} onPress={() => submit()}>
                    <Text
                        style={{
                        color: "white",
                        fontSize: 20
                    }}>Translate to American Sign Language</Text>
                </TouchableOpacity>
                <ScrollView style={styles.ScrollView}>
                    <View style={styles.ImageContainer}>
                        {imgData.length > 0 && imgData.map((object, index) => {
                            let uri = '../assets/asl/' + object.character + '.png';
                            return (
                                <View key={'container' + index}>
                                    <Image
                                        key={index}
                                        source={{
                                        uri: '' + asl[object.character + '']
                                    }}
                                        style={styles.signImage}></Image>
                                    <Text
                                        key={'char' + index}
                                        style={{
                                        textAlign: "center"
                                    }}>{object.character}</Text>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column'
    },
    container1: {
        height: Dimensions
            .get('window')
            .height * 0.2
    },
    textArea: {
        width: Dimensions
            .get('window')
            .width,
        height: '100%',
        backgroundColor: 'white',
        color: 'black',
        marginTop: 0,
        fontSize: 20,
        paddingHorizontal: 20
    },
    container2: {
        flexDirection: 'column',
        height: (Dimensions.get('window').height * 0.8) - 70,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: "lightblue",
        padding: 20
    },
    signImage: {
        width: (Dimensions.get('window').width - 40) / 5,
        height: 80,
        resizeMode: 'contain',
        borderWidth: 1
    },
    translateButton: {
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions
            .get('window')
            .height * 0.1,
        borderRadius: 10,
        fontSize: 10,
        marginBottom: 10
    },
    ImageContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflow: "scroll",
        backgroundColor: 'transparent'
    },
    ScrollView: {}

});