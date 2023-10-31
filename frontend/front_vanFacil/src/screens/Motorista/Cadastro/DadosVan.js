import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { TextInput } from 'react-native-gesture-handler';

import cores from '../../../../assets/cores';

export default function DadosVan(props) {
   const { cnpj, setCnpj, placa, setPlaca, modelo, setModelo, desc, setDesc, loading } = props;
   const [cnpjExibir, setCnpjExibir] = useState('');

   useEffect(() => {
      formatCnpj(cnpj);
   }, []);

   const formatCnpj = (text) => {
      // Remove qualquer caractere não numérico do texto.
      const cleanedText = text.replace(/\D/g, '');
      let digitos = cleanedText.length;
      let formatado;

      // Aplica uma parte da mascara a cada digito inserido
      if (digitos > 0 && digitos <= 2) {
         formatado = cleanedText;
      } else if (digitos > 2 && digitos <= 5) {
         formatado = cleanedText.replace(/(\d{2})(\d{1}|\d{2}|\d{3})/, '$1.$2');
      } else if (digitos > 5 && digitos <= 8) {
         formatado = cleanedText.replace(/(\d{2})(\d{3})(\d{1}|\d{2}|\d{3})/, '$1.$2.$3');
      } else if (digitos > 8 && digitos <= 12) {
         formatado = cleanedText.replace(/(\d{2})(\d{3})(\d{3})(\d{1}|\d{2}|\d{3}|\d{4})/, '$1.$2.$3/$4');
      } else if (digitos <= 14) {
         formatado = cleanedText.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1}|\d{2})/, '$1.$2.$3/$4-$5');
      }

      setCnpjExibir(formatado);
      setCnpj(cleanedText);
   };

   const formatPlaca = (text) => {
      setPlaca(text.toUpperCase());
   };

   return (
      <View style={estilos.inputContainer}>
         <TextInput
            editable={!loading}
            style={[estilos.input, estilos.textoInput]}
            value={cnpjExibir}
            onChangeText={formatCnpj}
            inputMode={'numeric'}
            maxLength={18}
            placeholder={'CNPJ'}
            placeholderTextColor={cores.cinza}
         />
         <TextInput
            editable={!loading}
            style={[estilos.input, estilos.textoInput]}
            value={placa}
            onChangeText={formatPlaca}
            maxLength={7}
            placeholder={'Placa da van'}
         />
         <TextInput
            editable={!loading}
            multiline={true}
            numberOfLines={3}
            style={[estilos.inputMultiLine, estilos.textoInput]}
            value={modelo}
            onChangeText={setModelo}
            maxLength={141}
            placeholder={'Modelo da van'}
         />
         <TextInput
            editable={!loading}
            multiline={true}
            numberOfLines={6}
            style={[estilos.inputMultiLine, estilos.textoInput]}
            value={desc}
            onChangeText={setDesc}
            maxLength={282}
            placeholder={
               'Forneça uma descrição geral listando os bairros e regiões que você atua, para que os alunos que moram próximos possam entrar em contato com você.'
            }
         />
      </View>
   );
}

const estilos = StyleSheet.create({
   inputContainer: {
      width: '100%',
   },
   input: {
      height: 40,
      paddingHorizontal: 10,
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
      marginVertical: 10,
   },
   inputMultiLine: {
      lineHeight: 20,
      textAlignVertical: 'top',
      padding: 10,
      borderWidth: 1,
      borderColor: cores.azulProfundo,
      borderRadius: 5,
      marginVertical: 10,
   },
   textoInput: {
      fontSize: 16,
      fontFamily: 'RubikRegular',
   },
});
