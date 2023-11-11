import React, { useState, createContext, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions, BackHandler, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import * as Yup from 'yup';

import api from '../../../services/api';
import toast from '../../../helpers/toast';
import DadosPessoais from '../../Shared/Cadastro/DadosPessoais';
import Texto from '../../../components/Texto';
import cores from '../../../../assets/cores';
import DadosVan from './DadosVan';
import { ScrollView } from 'react-native-gesture-handler';

const esquemaMotorista = Yup.object({
   confirmacao: Yup.string().required('Confirme sua senha'),
   senha: Yup.string().required('Informe a senha com a qual pretende se altenticar'),
   phone: Yup.string().required('Informe seu telefone').min(15, 'Telefone inválido'),
   email: Yup.string().email('Email inválido').required('Informe seu email'),
   nome: Yup.string().required('Informe seu nome'),
});

const esquemaMotoristaGoogle = Yup.object({
   phone: Yup.string().required('Informe seu telefone').min(15, 'Telefone inválido'),
   email: Yup.string().email('Email inválido').required('Informe seu email'),
   nome: Yup.string().required('Informe seu nome'),
});

const esquemaInfoVan = Yup.object({
   desc: Yup.string().required('Informe a descrição dos bairros'),
   modelo: Yup.string().required('Informe o modelo da van'),
   placa: Yup.string().required('Informe a placa da van').min(7, 'Placa inválida'),
   cnpj: Yup.string().required('Informe o CNPJ').min(14, 'CNPJ inválido'),
});

export default function CadastroMotorista() {
   const [nome, setNome] = useState(null);
   const [email, setEmail] = useState(null);
   const [phone, setPhone] = useState('');
   const [senha, setSenha] = useState('');
   const [confirSenha, setConfirSenha] = useState('');

   const [cnpj, setCnpj] = useState('');
   const [placa, setPlaca] = useState('');
   const [modelo, setModelo] = useState('');
   const [desc, setDesc] = useState('');

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
               <DadosVan
                  cnpj={cnpj}
                  setCnpj={setCnpj}
                  placa={placa}
                  setPlaca={setPlaca}
                  modelo={modelo}
                  setModelo={setModelo}
                  desc={desc}
                  setDesc={setDesc}
                  loading={loading}
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
         await esquemaMotorista
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
         await esquemaMotoristaGoogle
            .validate(dadosPessoais)
            .then(nextStep)
            .catch((e) => {
               toast(e.errors[0], 'error');
            });
      }
   };

   const validaInfoVan = async () => {
      const infoVan = {
         cnpj: cnpj,
         placa: placa,
         modelo: modelo,
         desc: desc,
      };
      await esquemaInfoVan
         .validate(infoVan)
         .then(() => {
            cadastrar();
         })
         .catch((e) => {
            toast(e.errors[0], 'error');
         });
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
                     console.log('ERROR IS 123: ' + JSON.stringify(e));
                  });
            }
         })
         .catch((e) => {
            console.log('ERROR IS: ' + JSON.stringify(e));
         });
   };

   const singup = () => {
      setLoading(true);
      const requestPayload = {
         name: nome,
         email: email,
         phone: phone,
         password: senha,
         cnpj: cnpj,
         descricao: desc,
         van: { license_plate: placa, model: modelo },
      };
      api.post('auth/singup?profile=driver', requestPayload)
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
      const requestPayload = { googleToken, phone, cnpj, descricao: desc, van: { license_plate: placa, model: modelo } };
      api.post('/auth/singup/google?profile=driver', requestPayload)
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
            <Texto style={estilos.textoTitulo}>{step == 0 ? 'Motorista\nDados Pessoais' : 'Motorista\nInformações da van'}</Texto>
            <View style={estilos.linha}></View>
         </View>
         <ScrollView style={estilos.formContainer}>
            {ChoseConp(step)}
            <View style={estilos.buttonContainer}>
               {loading ? (
                  <ActivityIndicator style={{ justifyContent: 'center' }} size="large" color={cores.azulProfundo} />
               ) : (
                  <>
                     <TouchableOpacity style={estilos.button} onPress={step === lastStep ? validaInfoVan : validaDadosPessoais}>
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
         </ScrollView>
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
      marginTop: alturaTela * 0.06,
      alignItems: 'center',
   },
   textoTitulo: {
      textAlign: 'center',
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
      paddingTop: alturaTela * 0.06,
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
