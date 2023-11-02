import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import cores from '../../../../assets/cores';

export default function DadosPessoais(props) {
   const { nome, setNome, email, setEmail, phone, setPhone, senha, setSenha, confirSenha, setConfirSenha, editarCampos, loading } = props;
   const [senhaVisivel, setSenhaVisivel] = useState(false);
   const [confirSenhaVisivel, setConfirSenhaVisivel] = useState(false);

   const formatPhoneNumber = (text) => {
      // Remove qualquer caractere não numérico do texto.
      const cleanedText = text.replace(/\D/g, '');

      const match = cleanedText.match(/^(\d{0,2})(\d{0,9})$/);
      if (match) {
         let formattedText = '';

         if (match[1]) {
            formattedText += `(${match[1]}`;
            if (match[2] && match[2].length >= 1) {
               formattedText += ')';
            }
         }

         if (match[2]) {
            if (match[2].length <= 5) {
               formattedText += ` ${match[2]}`;
            } else {
               formattedText += ` ${match[2].substring(0, 5)}-${match[2].substring(5)}`;
            }
         }

         setPhone(formattedText);
      } else {
         setPhone(cleanedText);
      }
   };

   return (
      <View style={estilos.inputContainer}>
         <TextInput
            editable={!editarCampos}
            style={[estilos.input, estilos.textoInput]}
            value={nome}
            onChangeText={setNome}
            maxLength={60}
            placeholder={'Nome'}
         />
         <TextInput
            editable={!editarCampos}
            style={[estilos.input, estilos.textoInput]}
            value={email}
            onChangeText={setEmail}
            maxLength={40}
            placeholder={'Email'}
         />
         <TextInput
            editable={!loading}
            style={[estilos.input, estilos.textoInput]}
            value={phone}
            onChangeText={formatPhoneNumber}
            inputMode={'numeric'}
            maxLength={15}
            placeholder={'Telefone'}
            placeholderTextColor={cores.cinza}
         />
         <View style={estilos.input}>
            <TextInput
               style={estilos.textoInput}
               editable={!editarCampos}
               value={senha}
               secureTextEntry={!senhaVisivel}
               onChangeText={setSenha}
               maxLength={40}
               placeholder={'Senha'}
            />
            <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)} style={estilos.visibleIcon}>
               <MaterialIcons name={senhaVisivel ? 'visibility' : 'visibility-off'} size={24} color="white" />
            </TouchableOpacity>
         </View>
         <View style={estilos.input}>
            <TextInput
               style={estilos.textoInput}
               editable={!editarCampos}
               value={confirSenha}
               secureTextEntry={!confirSenhaVisivel}
               onChangeText={setConfirSenha}
               maxLength={40}
               placeholder={'Confirme sua senha'}
            />
            <TouchableOpacity onPress={() => setConfirSenhaVisivel(!confirSenhaVisivel)} style={estilos.visibleIcon}>
               <MaterialIcons name={confirSenhaVisivel ? 'visibility' : 'visibility-off'} size={24} color="white" />
            </TouchableOpacity>
         </View>
      </View>
   );
}

const estilos = StyleSheet.create({
   inputContainer: {
      width: '100%',
   },
   visibleIcon: {
      position: 'absolute',
      right: 0,
      height: '100%',
      width: '10%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: cores.azulProfundo,
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
   textoInput: {
      fontSize: 16,
      fontFamily: 'RubikRegular',
   },
});
