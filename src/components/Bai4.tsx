import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useEffect, useRef} from 'react'
// bài 4: Viết chương trình giải phương trình bậc nhất ax + b = 0
const Bai4 = () => {
    const [a, setA] = React.useState('');
    const [b, setB] = React.useState('');
    const [result, setResult] = React.useState('');

    const inputRef = React.useRef<TextInput>(null);
    // useEffect(() => {inputRef.current?.focus()}, []);

    const calculateResult = () => {
        const NumberA = parseFloat(a);
        const NumberB = parseFloat(b);
        if (a === '' || b === '') {
            setResult('Vui lòng nhập đầy đủ các hệ số a và b');
            return;
        }
        if (isNaN(NumberA) || isNaN(NumberB)) {
            setResult('Vui lòng nhập các giá trị hợp lệ cho a và b');
            return;
        }
        if (NumberA === 0) {
            if (NumberB === 0) {
                setResult('Phương trình có vô số nghiệm');
            } else {
                setResult('Phương trình vô nghiệm');
            }
        } else {
            const x = -NumberB / NumberA;
            setResult(`Nghiệm của phương trình là: \n ${x.toFixed(2)}`);
        }
    };
    const deleteResult = () => {
        setA('');
        setB('');
        setResult('');
    }
    inputRef.current?.focus();

    return (
        <View style={styles.container}>
            <Text>Giải phương trình bậc nhất ax + b = 0</Text>
            <TextInput
                placeholder="Nhập a"
                style={styles.input}
                value={a}
                onChangeText={setA}
                ref={inputRef}
            />
            <TextInput
                placeholder="Nhập b"
                style={styles.input}
                value={b}
                onChangeText={setB}
            />
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '80%' }}>
                <TouchableOpacity style={styles.button} onPress={calculateResult}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={deleteResult}>
                    <Text style={styles.buttonText}>Xóa</Text>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: '80%' }}>
                <Text style={{ textAlign: 'center', color: 'red' }}>{result}</Text>
            </View>
        </View>
    )
}

export default Bai4

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
        margin: 10,
        width: '50%',
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    }
})