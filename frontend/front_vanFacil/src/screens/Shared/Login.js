import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

import * as Yup from 'yup';
import toast from '../../helpers/toast';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Auth/AuthContext';

import cores from '../../../assets/cores';
import Texto from '../../components/Texto';

const esquemaLogin = Yup.object({
   senha: Yup.string().required('Informe sua senha'),
   email: Yup.string().email('Email inválido.').required('Informe o email cadastrado'),
});

export default function Login() {
   const [email, setEmail] = useState('');
   const [senha, setSenha] = useState('');

   const [loading, setLoading] = useState(false);
   const [senhaVisivel, setSenhaVisivel] = useState(false);

   const navigation = useNavigation();
   const { handleLogin, handleGoogleLogin, handleLogout } = useContext(AuthContext);

   // Limpa os dados quando o usuário voltar de outra tela
   useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
         setEmail('');
         setSenha('');
      });

      return unsubscribe;
   }, [navigation]);

   const validarForm = async () => {
      const form = {
         email: email,
         senha: senha,
      };
      const validation = {
         result: true,
         message: '',
      };
      await esquemaLogin.validate(form).catch((err) => {
         validation.result = false;
         validation.message = err.errors[0];
      });

      return validation;
   };

   const login = async () => {
      const basicValidation = await validarForm();
      if (basicValidation.result) {
         setLoading(true);
         await handleLogin(email, senha);
         setLoading(false);
      } else {
         toast(basicValidation.message, 'error');
      }
   };

   const loginComGoogle = async () => {
      GoogleSignin.hasPlayServices()
         .then((hasPlayService) => {
            if (hasPlayService) {
               GoogleSignin.signIn()
                  .then(async (userInfo) => {
                     const { accessToken } = await GoogleSignin.getTokens();
                     GoogleSignin.signOut();
                     handleGoogleLogin(accessToken);
                  })
                  .catch((e) => {
                     console.log('Erro no login com Google: ' + JSON.stringify(e));
                  });
            }
         })
         .catch((e) => {
            console.log('Erro no login com Google: ' + JSON.stringify(e));
         });
   };

   return (
      <View style={estilos.container}>
         <View style={estilos.tituloContainer}>
            <Texto style={estilos.textoTitulo}>Login</Texto>
            <View style={estilos.linha}></View>
         </View>
         <View style={estilos.formContainer}>
            <TextInput
               editable={!loading}
               style={[estilos.input, estilos.textoInput]}
               value={email}
               onChangeText={setEmail}
               maxLength={40}
               placeholder={'Email'}
            />

            <View style={estilos.input}>
               <TextInput
                  style={estilos.textoInput}
                  editable={!loading}
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

            <View style={estilos.buttonContainer}>
               {loading ? (
                  <ActivityIndicator style={{ justifyContent: 'center' }} size="large" color={cores.azulProfundo} />
               ) : (
                  <>
                     <TouchableOpacity style={estilos.button} onPress={login}>
                        <Texto style={estilos.textoBotao}>ENTRAR</Texto>
                     </TouchableOpacity>

                     <TouchableOpacity style={estilos.button} onPress={loginComGoogle}>
                        <Texto style={estilos.textoBotao}>ENTRAR COM O GOOGLE</Texto>
                     </TouchableOpacity>
                     <View style={{ flexDirection: 'row' }}>
                        <Texto>Não possui conta ainda?</Texto>
                        <TouchableOpacity
                           onPress={() => {
                              navigation.navigate('CaminhoCadastro');
                           }}
                        >
                           <Texto style={estilos.textoLink}>Cadastre-se</Texto>
                        </TouchableOpacity>
                     </View>
                  </>
               )}
            </View>
         </View>
      </View>
   );
}

const alturaTela = Dimensions.get('screen').height;

const estilos = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: '5%',
      backgroundColor: cores.branco,
      justifyContent: 'flex-start',
      alignItems: 'center',
   },
   tituloContainer: {
      width: '100%',
      height: alturaTela * 0.1,
      justifyContent: 'flex-start',
      marginTop: alturaTela * 0.1,
      alignItems: 'center',
   },
   textoTitulo: {
      fontSize: 24,
      fontWeight: 'bold',
      color: cores.cinzaEscuro,
   },
   linha: {
      height: 2,
      width: '100%',
      backgroundColor: cores.azulProfundo,
      borderRadius: 5,
      marginTop: 10,
   },
   formContainer: {
      height: alturaTela * 0.3,
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      paddingBottom: alturaTela * 0.2,
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
   buttonContainer: {
      height: 140,
      justifyContent: 'center',
   },
   button: {
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: cores.azulProfundo,
      borderRadius: 5,
      marginVertical: 10,
   },
   textoBotao: {
      color: cores.branco,
      fontWeight: 'bold',
   },
   textoLink: {
      paddingLeft: 5,
      fontWeight: 'bold',
      color: cores.azulLink,
   },
});
