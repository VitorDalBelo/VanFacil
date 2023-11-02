import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions, BackHandler, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import * as Yup from 'yup';

import api from '../../../services/api';
import toast from '../../../helpers/toast';
import DadosPessoais from '../../Shared/Cadastro/DadosPessoais';
import Texto from '../../../components/Texto';
import cores from '../../../../assets/cores';
import Local from './Local';

const esquemaPassageiro = Yup.object({
   confirmacao: Yup.string().required('Confirme sua senha'),
   senha: Yup.string().required('Informe a senha com a qual pretende se altenticar'),
   phone: Yup.string().required('Informe seu telefone').min(15, 'Telefone inválido'),
   email: Yup.string().email('Email inválido').required('Informe seu email'),
   nome: Yup.string().required('Informe seu nome'),
});

const esquemaPassageiroGoogle = Yup.object({
   phone: Yup.string().required('Informe seu telefone').min(15, 'Telefone inválido'),
   email: Yup.string().email('Email inválido').required('Informe seu email'),
   nome: Yup.string().required('Informe seu nome'),
});

const esquemaEndereco = Yup.object({
   numero: Yup.number().required('Inclua o número da residência'),
   logradouro: Yup.string().required('Informe seu endereço completo'),
   bairro: Yup.string().required('Informe seu endereço completo'),
   cidade: Yup.string().required('Informe seu endereço completo'),
   uf: Yup.string().required('Informe seu endereço completo'),
   pais: Yup.string().required('Informe seu endereço completo'),
});

export default function CadastroPassageiro() {
   const [nome, setNome] = useState(null);
   const [email, setEmail] = useState(null);
   const [phone, setPhone] = useState('');
   const [senha, setSenha] = useState('');
   const [confirSenha, setConfirSenha] = useState('');

   const [endereco, setEndereco] = useState({ latitude: null, longitude: null });
   const [complemento, setComplemento] = useState(null);
   const [selectedCampus, setSelectedCampus] = useState(null);

   const [loading, setLoading] = useState(false);
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
                  selectedCampus={selectedCampus}
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
      if (condition && !loading) setStep(step - 1);
      return condition;
   }

   useEffect(() => {
      const backAction = () => {
         if (!loading) {
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
         } else {
            Alert.alert('Sair', 'Aguarde enquanto finalizamos seu cadastro.', [
               {
                  text: 'OK',
                  onPress: () => null,
                  style: 'cancel',
               },
            ]);
         }

         return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove();
   }, [step, loading]);

   const validaDadosPessoais = async () => {
      const dadosPessoais = {
         nome: nome,
         email: email,
         phone: phone,
         senha: senha,
         confirmacao: confirSenha,
      };

      if (!cadastroGoogle) {
         await esquemaPassageiro
            .validate(dadosPessoais)
            .then(() => {
               if (dadosPessoais.senha != dadosPessoais.confirmacao) {
                  toast('A confirmação da senha não corresponde com a senha informada', 'error');
               } else {
                  nextStep();
               }
            })
            .catch((e) => {
               toast(e.errors[0], 'error');
            });
      } else {
         await esquemaPassageiroGoogle
            .validate(dadosPessoais)
            .then(nextStep)
            .catch((e) => {
               toast(e.errors[0], 'error');
            });
      }
   };

   const validaEndereco = async () => {
      if (selectedCampus == null) {
         toast('Selecione o campus', 'error');
      } else {
         await esquemaEndereco
            .validate(endereco)
            .then(cadastrar)
            .catch((e) => {
               toast(e.errors[0], 'error');
            });
      }
   };

   const cadastrar = async () => {
      if (cadastroGoogle) {
         singupGoogle();
      } else {
         singup();
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
                     console.log('error: ' + JSON.stringify(e));
                  });
            }
         })
         .catch((e) => {
            console.log('error: ' + JSON.stringify(e));
         });
   };

   const singup = () => {
      setLoading(true);
      const requestPayload = {
         name: nome,
         email: email,
         phone: phone,
         password: senha,
         campus_id: selectedCampus,
      };
      requestPayload.address = { ...endereco, complemento };
      api.post('auth/singup?profile=passenger', requestPayload)
         .then(() => {
            navigation.navigate('Login');
            toast('Usuário cadastrado com sucesso', 'success');
         })
         .catch((e) => {
            console.log('error: ', e);
            if (e.response && e.response.data) toast(e.response.data.message, 'error');
            else toast('Ocorreu um erro', 'error');
         })
         .finally(() => {
            setLoading(false);
         });
   };

   const singupGoogle = () => {
      setLoading(true);
      const requestPayload = { googleToken, phone, campus_id: selectedCampus, address: { ...endereco, complemento } };
      api.post('/auth/singup/google?profile=passenger', requestPayload)
         .then(() => {
            navigation.navigate('Login');
            toast('Usuário cadastrado com sucesso', 'success');
         })
         .catch((e) => {
            console.log('error: ', e);
            if (e.response && e.response.data) toast(e.response.data.message, 'error');
            else toast('Ocorreu um erro', 'error');
         })
         .finally(() => {
            setLoading(false);
         });
   };

   return (
      <View style={estilos.container}>
         <View style={estilos.tituloContainer}>
            <Texto style={estilos.textoTitulo}>{step == 0 ? 'Passageiro - Dados Pessoais' : 'Passageiro - Endereço'}</Texto>
            <View style={estilos.linha}></View>
         </View>
         <View style={estilos.formContainer}>
            {ChoseConp(step)}
            <View style={estilos.buttonContainer}>
               {loading ? (
                  <ActivityIndicator style={{ justifyContent: 'center' }} size="large" color={cores.azulProfundo} />
               ) : (
                  <>
                     <TouchableOpacity style={estilos.button} onPress={step === lastStep ? validaEndereco : validaDadosPessoais}>
                        <Texto style={estilos.textoBotao}>{step === lastStep ? 'CADASTRAR' : 'CONTINUAR'}</Texto>
                     </TouchableOpacity>

                     {step === 0 && !cadastroGoogle && (
                        <TouchableOpacity style={estilos.button} onPress={() => cadastrarGoogle()}>
                           <Texto style={estilos.textoBotao}>CADASTRAR COM GOOGLE</Texto>
                        </TouchableOpacity>
                     )}
                  </>
               )}
               {step === 1 && !loading && (
                  <TouchableOpacity style={estilos.button} onPress={() => prevStep()}>
                     <Texto style={estilos.textoBotao}>VOLTAR</Texto>
                  </TouchableOpacity>
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
