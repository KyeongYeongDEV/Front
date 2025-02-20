import React from 'react';
import {SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";

function JoinScreen() {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>회원가입</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.explanation}>이름을 입력해주세요.</Text>
                    <TextInput style={styles.input}
                               placeholder="이곳을 눌러주세요" />
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.explanation}>나이를 입력해주세요.</Text>
                    <TextInput style={styles.input}
                               placeholder="이곳을 눌러주세요" />
                </View>
                <View style={styles.idInfoBox}>
                    <Text style={styles.explanation}>아이디를 입력해주세요.</Text>
                    <View style={styles.idInputBox}>
                        <TextInput style={styles.idInput}
                                   placeholder="이곳을 눌러주세요" />
                        <TouchableOpacity style={styles.overButton}>
                            <Text style={styles.overText}>중복확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.explanation}>비밀번호를 입력해주세요.</Text>
                    <TextInput style={styles.input}
                               placeholder="이곳을 눌러주세요" />
                </View>
                <TouchableOpacity style={styles.completeButton}>
                    <Text style={styles.completeText}>회원가입 완료하기</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    titleBox: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '10%',
    },
    title: {
        fontSize: 45,
        color: '#6E83B7',
        fontWeight: 'bold',
    },
    infoBox: {
        flex: 5,
    },
    explanation: {
        fontSize: 20,
        color: '#727783',
        fontWeight: 'bold',
        marginLeft: '10%',
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#d9d9d9',
        fontSize: 20,
        color: '#AFB3BF',
        fontWeight: 'bold',
        marginHorizontal: '10%',
        marginVertical: '5%',
        paddingVertical: '3%',
        paddingLeft: '2%',
    },
    idInfoBox: {
        flex: 6.5,
    },
    idInputBox: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#d9d9d9',
        marginHorizontal: '10%',
        marginVertical: '5%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    idInput: {
        fontSize: 20,
        color: '#AFB3BF',
        fontWeight: 'bold',
        paddingVertical: '3%',
        paddingLeft: '2%',
    },
    overButton: {
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    overText: {
        color: '#727783',
        fontSize: 18,
        fontWeight: 'bold',
    },
    completeButton: {
        flex: 3,
        backgroundColor: '#6E83B7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    completeText: {
        color: '#EEEEEE',
        fontSize: 25,
        fontWeight: 'bold',
    },
});

export default JoinScreen;
