import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState, useRef } from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {

    // Dữ liệu trong Cha
    const [a, setA] = useState('')
    const [b, setB] = useState('')

    // Kết quả giải phương trình của Cha
    const [result, setResult] = useState('')

    // Dữ liệu truyền xuống Con
    const [aSend, setASend] = useState('')
    const [bSend, setBSend] = useState('')

    const inputRef = useRef<TextInput>(null);

    // khai báo biến đếm
    const [count, setCount] = useState(0);

    // Giải phương trình
    const onGiai = () => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        if (isNaN(numA) || isNaN(numB)) {
            Alert.alert('Vui lòng nhập số hợp lệ cho A và B');
            return;
        }

        if (numA === 0) {
            if (numB === 0) {
                setResult('Phương trình có vô số nghiệm.');
            } else {
                setResult('Phương trình vô nghiệm.');
            }
        } else {
            const x = -numB / numA;
            setResult(`Nghiệm của phương trình là:\n x = ${x.toFixed(2)}`);
        }
    };

    // Xóa dữ liệu
    const onClear = () => {
        setA('');
        setB('');
        setResult('');
        inputRef.current?.focus();
    };

    // CHA → CON
    const onTruyenCon = () => {
        setASend(a);
        setBSend(b);
        setCount(count + 1); // Tăng biến đếm lên 1 mỗi lần truyền dữ liệu xuống Con

        Alert.alert(
            'Thành công',
            `Đã truyền A = "${a}", B = "${b}" xuống cho Con!`
        );
    };
    
    // Hàm nhận dữ liệu từ Con
    const onReceiveFromChild = (newA: string, newB: string) => {
        setA(newA);
        setB(newB);
    };

    return (
        <View>

            {/* =========================
                PHẦN CHA
                ========================= */}
            <View style={styles.parentContainer}>

                <Text style={styles.title}>
                    Parent Component (Cha)
                </Text>

                <Text style={styles.description}>
                    Nhập hệ số A, B tại Cha. Bạn có thể Giải pt, Xóa
                    hoặc bấm "Truyền con"
                </Text>

                {/* Input A */}
                <TextInput
                    style={styles.input}
                    ref={inputRef}
                    placeholder="Nhập hệ số A"
                    keyboardType="numeric"
                    value={a}
                    onChangeText={setA}
                />

                {/* Input B */}
                <TextInput
                    style={styles.input}
                    placeholder="Nhập hệ số B"
                    keyboardType="numeric"
                    value={b}
                    onChangeText={setB}
                />

                {/* 3 nút của Cha */}
                <View style={styles.buttonRow}>

                    {/* Giải pt */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onGiai}
                    >
                        <Text style={styles.buttonText}>
                            Giải pt
                        </Text>
                    </TouchableOpacity>

                    {/* Xóa */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onClear}
                    >
                        <Text style={styles.buttonText}>
                            Xóa
                        </Text>
                    </TouchableOpacity>

                    {/* Truyền con */}
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={onTruyenCon}
                    >
                        <Text style={styles.buttonText}>
                            Truyền con
                        </Text>
                    </TouchableOpacity>

                </View>

                {/* Kết quả của Cha */}
                {result !== '' && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultText}>
                            {result}
                        </Text>
                    </View>
                )}

            </View>


            {/* =========================
                PHẦN CON
                ========================= */}
            <View style={styles.childContainer}>

                <ChildComponent
                    aProp={aSend}
                    bProp={bSend}
                    demProp={count}
                    onSendToParent={onReceiveFromChild}
                />

            </View>

        </View>
    )
}

export default ParentComponent

const styles = StyleSheet.create({
    parentContainer: {
        borderWidth: 1,
        borderColor: '#00a6c7',
        borderRadius: 8,
        padding: 10,
    },

    childContainer: {
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#e65b6a',
        borderRadius: 8,
        padding: 10,
    },

    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    description: {
        textAlign: 'center',
        fontSize: 13,
        marginBottom: 10,
    },

    input: {
        padding: 8,
        margin: 2,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        color: '#0e0d0d',
        fontSize: 18,
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },

    button: {
        backgroundColor: '#00bcd4',
        flex: 1,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 3,
    },

    sendButton: {
        backgroundColor: '#e6395c',
        flex: 1,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 3,
    },

    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },

    resultContainer: {
        marginTop: 10,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    resultText: {
        fontSize: 17,
        textAlign: 'center',
    },
})