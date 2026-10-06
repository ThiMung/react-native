import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState, useRef, useEffect } from 'react';

type Props = {
    aProp: string;
    bProp: string;
    demProp: number; // Biến đếm từ Cha

    // Hàm nhận từ Cha để truyền dữ liệu ngược lên
    onSendToParent: (a: string, b: string) => void;
};

const ChildComponent = ({ aProp, bProp, demProp, onSendToParent}: Props) => {

    // Dữ liệu riêng của Con
    const [a, setA] = useState('')
    const [b, setB] = useState('')

    const [result, setResult] = useState('')

    const inputRef = useRef<TextInput>(null);

    // ==========================================
    // NHẬN DỮ LIỆU TỪ CHA
    // ==========================================
    useEffect(() => {
        setA(aProp);
        setB(bProp);
    }, [aProp, bProp, demProp]);


    // ==========================================
    // GIẢI PHƯƠNG TRÌNH
    // ==========================================
    const onGiai = () => {

        const numA = parseFloat(a);
        const numB = parseFloat(b);

        if (isNaN(numA) || isNaN(numB)) {
            Alert.alert('Vui lòng nhập số hợp lệ cho hệ số A và B.');
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


    // ==========================================
    // XÓA
    // ==========================================
    const onClear = () => {
        setA('');
        setB('');
        setResult('');

        inputRef.current?.focus();
    };

    return (
        <View>

            <Text style={styles.title}>
                Child Component (Con)
            </Text>

            <Text style={styles.description}>
                Nhận dữ liệu từ Cha nhưng vẫn có thể chỉnh sửa
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


            {/* 3 nút của Con */}
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


                {/* Truyền cha */}
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={ () => { onSendToParent(a, b); }}>
                    <Text style={styles.buttonText}>
                        Truyền cha
                    </Text>
                </TouchableOpacity>

            </View>


            {/* Kết quả */}
            {result !== '' && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>
                        {result}
                    </Text>
                </View>
            )}

        </View>
    )
}

export default ChildComponent

const styles = StyleSheet.create({

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
