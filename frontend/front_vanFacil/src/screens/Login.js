import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function Login() {
   const [text, onChangeText] = React.useState('Useless Text');
   const [number, onChangeNumber] = React.useState('');

   return (
      <>
         // Estes são exemplos de input de texto
         <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
         <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="useless placeholder"
            keyboardType="default"
         />
      </>
   );
}

const styles = StyleSheet.create({
   input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
   },
});
