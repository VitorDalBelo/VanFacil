import React, { useState, createContext, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions, BackHandler, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import * as Yup from 'yup';

import api from '../../../services/api';
import toast from '../../../helpers/toast';
import DadosPessoais from './DadosPessoais';
import Texto from '../../../components/Texto';
import cores from '../../../../assets/cores';
import Local from './Local';

const SteperContext = createContext();

const esquemaPassageiro = Yup.object({
   confirmacao: Yup.string().required('Confirme sua senha'),
   senha: Yup.string().required('Informe a senha com a qual pretende se altenticar'),
   phone: Yup.string().required('Informe seu telefone').min(14, 'Telefone inválido'),
   email: Yup.string().email('Email inválido').required('Informe seu email'),
   nome: Yup.string().required('Informe seu nome'),
});

const esquemaPassageiroGoogle = Yup.object({
   phone: Yup.string().required('Informe seu telefone').min(14, 'Telefone inválido'),
   email: Yup.string().email('Email inválido').required('Informe seu email'),
   nome: Yup.string().required('Informe seu nome'),
});

export default function CadastroPassageiro() {
   const [nome, setNome] = useState(null);
   const [email, setEmail] = useState(null);
   const [phone, setPhone] = useState('');
   const [senha, setSenha] = useState('');
   const [confirSenha, setConfirSenha] = useState('');
   const [loading, setLoading] = useState(false);
   const [endereco, setEndereco] = useState({ latitude: null, longitude: null });
   const [complemento, setComplemento] = useState(null);
   const [selectedCampus, setSelectedCampus] = useState(null);
   const [cadastroGoogle, setCadastroGoogle] = useState(false);
   const [googleToken, setGoogleToken] = useState('');

   const editarCampos = loading || cadastroGoogle;

   const navigation = useNavigation();
   const [step, setStep] = useState(0);
   const lastStep = 1;

   function ChoseConp(key) {
      switch (key) {
         case 0:
            return (
               <DadosPessoais
                  nome={nome}
                  setNome={setNome}
                  email={email}
                  phone={phone}
                  setPhone={setPhone}
                  setEmail={setEmail}
                  senha={senha}
                  setSenha={setSenha}
                  confirSenha={confirSenha}
                  setConfirSenha={setConfirSenha}
                  loading={loading}
                  editarCampos={editarCampos}
               />
            );
         case 1:
            return (
               <Local
                  loading={loading}
                  endereco={endereco}
                  setEndereco={setEndereco}
                  complemento={complemento}
                  setComplemento={setComplemento}
                  setSelectedCampus={setSelectedCampus}
               />
            );
      }
   }

   function nextStep() {
      const condition = step < lastStep;
      if (condition) setStep(step + 1);
      return condition;
   }

   function prevStep() {
      const condition = step > 0;
      if (condition) setStep(step - 1);
      return condition;
   }

   useEffect(() => {
      const backAction = () => {
         if (step > 0) prevStep();
         else {
            Alert.alert('Sair', 'Tem certeza de que quer sair do cadastro?\nOs dados não serão salvos.', [
               {
                  text: 'Cancelar',
                  onPress: () => null,
                  style: 'cancel',
               },
               { text: 'Sim', onPress: () => navigation.goBack() },
            ]);
         }

         return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove();
   }, [step]);

   const validarForm = async () => {
      const form = {
         nome: nome,
         email: email,
         phone: phone,
         senha: senha,
         confirmacao: confirSenha,
      };

      const validation = {
         result: true,
         message: 'Usuário cadastrado com sucesso',
      };
      if (!cadastroGoogle) {
         await esquemaPassageiro
            .validate(form)
            .then(() => {
               if (form.senha != form.confirmacao) {
                  validation.result = false;
                  validation.message = 'A confirmação da senha não corresponde com a senha informada.';
               }
            })
            .catch((e) => {
               validation.result = false;
               validation.message = e.errors[0];
            });
      } else {
         await esquemaPassageiroGoogle
            .validate(form)
            .then()
            .catch((e) => {
               validation.result = false;
               validation.message = e.errors[0];
            });
      }
      return validation;
   };

   const singup = (validacao) => {
      setLoading(true);
      const requestPayload = {
         name: nome,
         email: email,
         phone: phone,
         password: senha,
         campus_id: selectedCampus,
      };
      if (endereco) requestPayload.address = { ...endereco, complemento };
      api.post('auth/singup?profile=passenger', requestPayload)
         .then(() => {
            navigation.navigate('Login');
            toast(validacao.message, 'success');
         })
         .catch((e) => {
            console.log('error', e);
            if (e.response && e.response.data) toast(e.response.data.message, 'error');
            else toast('Ocorreu um erro', 'error');
         })
         .finally(() => {
            setLoading(false);
         });
   };

   const singupGoogle = (validacao) => {
      setLoading(true);
      const requestPayload = { googleToken, address: { ...endereco, complemento } };
      api.post('/auth/singup/google?profile=passenger', requestPayload)
         .then(() => {
            navigation.navigate('Login');
            toast(validacao.message, 'success');
         })
         .catch((e) => {
            console.log('error!!!!!!!', e);
            if (e.response && e.response.data) toast(e.response.data.message, 'error');
            else toast('Ocorreu um erro', 'error');
         })
         .finally(() => {
            setLoading(false);
         });
   };

   const cadastrar = async () => {
      const validacao = await validarForm();
      if (validacao.result) {
         const isNotLast = nextStep();
         if (!isNotLast) {
            if (cadastroGoogle) {
               singupGoogle(validacao);
            } else {
               singup(validacao);
            }
         }
      } else {
         toast(validacao.message, 'error');
      }
   };

   const cadastrarGoogle = async () => {
      GoogleSignin.hasPlayServices()
         .then((hasPlayService) => {
            if (hasPlayService) {
               GoogleSignin.signIn()
                  .then(async (userInfo) => {
                     console.log(userInfo.user.email, userInfo.user.name);
                     if (userInfo.user && userInfo.user.email && userInfo.user.name) {
                        setEmail(userInfo.user.email);
                        setNome(userInfo.user.name);
                        setSenha(' ');
                        setConfirSenha(' ');
                        setCadastroGoogle(true);
                        setGoogleToken((await GoogleSignin.getTokens()).accessToken);
                     }
                     GoogleSignin.signOut();
                  })
                  .catch((e) => {
                     console.log('ERROR IS 123: ' + JSON.stringify(e));
                  });
            }
         })
         .catch((e) => {
            console.log('ERROR IS: ' + JSON.stringify(e));
         });
   };

   return (
      <SteperContext.Provider
         value={{
            nome,
            setNome,
            email,
            setEmail,
            phone,
            setPhone,
            senha,
            setSenha,
            confirSenha,
            setConfirSenha,
            loading,
            setLoading,
            endereco,
            setEndereco,
            complemento,
            setComplemento,
            selectedCampus,
            setSelectedCampus,
            cadastroGoogle,
            setCadastroGoogle,
         }}
      >
         <View style={estilos.container}>
            <View style={estilos.tituloContainer}>
               <Texto style={estilos.textoTitulo}>{step == 0 ? 'Cadastro - Dados Pessoais' : 'Cadastro - Endereço'}</Texto>
               <View style={estilos.linha}></View>
            </View>
            <View style={estilos.formContainer}>
               {ChoseConp(step)}
               <View style={estilos.buttonContainer}>
                  {step === 1 && !cadastroGoogle && !loading && (
                     <TouchableOpacity style={estilos.button} onPress={() => prevStep()}>
                        <Texto style={estilos.textoBotao}>VOLTAR</Texto>
                     </TouchableOpacity>
                  )}
                  {loading ? (
                     <ActivityIndicator style={{ justifyContent: 'center' }} size="large" color={cores.azulProfundo} />
                  ) : (
                     <TouchableOpacity style={estilos.button} onPress={() => cadastrar()}>
                        <Texto style={estilos.textoBotao}>{step === lastStep ? 'CADASTRAR' : 'CONTINUAR'}</Texto>
                     </TouchableOpacity>
                  )}

                  {step === 0 && !cadastroGoogle && (
                     <TouchableOpacity style={estilos.button} onPress={() => cadastrarGoogle()}>
                        <Texto style={estilos.textoBotao}>CADASTRAR COM GOOGLE</Texto>
                     </TouchableOpacity>
                  )}
               </View>
            </View>
         </View>
      </SteperContext.Provider>
   );
}

const alturaTela = Dimensions.get('screen').height;

const estilos = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: '5%',
      backgroundColor: cores.branco,
      justifyContent: 'flex-start',
   },
   tituloContainer: {
      width: '100%',
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
      paddingTop: alturaTela * 0.1,
   },
   buttonContainer: {
      width: '100%',
      height: 120,
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
});
