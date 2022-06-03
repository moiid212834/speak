import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native';

export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                <View
                    style={{
                    padding: 15,
                    backgroundColor: 'lightblue',
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="chevron-left"
                            color="white"
                            size={37}
                            style={{
                            flex: 1
                        }}></Icon>
                    </TouchableOpacity>

                    <Text
                        style={{
                        fontSize: 30,
                        color: 'white',
                        alignSelf: 'center',
                        textAlign: 'center',
                        flex: 12
                    }}>Settings</Text>
                    <Text
                        style={{
                        fontSize: 30,
                        color: 'white',
                        alignSelf: 'center',
                        textAlign: 'center',
                        flex: 1
                    }}></Text>
                </View>
                <View>
                    <Text
                        style={{
                        fontSize: 20,
                        padding: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: '#eee'
                    }}>Translation Language
                    </Text>
                    <TouchableOpacity
                        style={{
                        padding: 20
                    }}>
                        <View
                            style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{
                                fontSize: 15
                            }}>English</Text>
                            <Icon name="check" size={20}></Icon>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled
                        style={{
                        padding: 20
                    }}>
                        <Text
                            style={{
                            color: '#aaa',
                            fontSize: 15,
                            textAlign: 'left'
                        }}>اردو</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled
                        style={{
                        padding: 20
                    }}>
                        <Text
                            style={{
                            color: '#aaa',
                            fontSize: 15
                        }}>हिंदी</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled
                        style={{
                        padding: 20
                    }}>
                        <Text
                            style={{
                            color: '#aaa',
                            fontSize: 15
                        }}>Español</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: 'lightblue'
            }}>
                <TouchableOpacity style={[styles.active]}>
                    <Text
                        style={{
                        fontSize: 14,
                        textAlign: 'center',
                        color: "black",
                        padding: 13,
                        backgroundColor: 'white',
                        width: 100
                    }}>
                        ASL
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.capture} disabled>
                    <Text
                        style={{
                        fontSize: 14,
                        textAlign: 'center',
                        color: "gray"
                    }}>
                        PSL
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.capture} disabled>
                    <Text
                        style={{
                        fontSize: 14,
                        textAlign: 'center',
                        color: "gray"
                    }}>
                        ISL
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    preview: {
        flex: 1
    },
    capture: {
        flex: 1,
        backgroundColor: '#ddd',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    active: {
        flex: 0,
        backgroundColor: 'lightblue',
        borderRadius: 5,
        padding: 2,
        margin: 20,
        borderColor: 'white',
        borderWidth: 2
    }
})