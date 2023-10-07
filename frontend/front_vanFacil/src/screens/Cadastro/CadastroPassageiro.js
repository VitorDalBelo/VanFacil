import React , {useState} from "react";
import { Button , Text, View , TouchableOpacity , ActivityIndicator,StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import api from "../../services/api";
import { MaterialIcons } from '@expo/vector-icons'; 
import Toast from 'react-native-root-toast';
import { useNavigation} from "@react-navigation/native";
import * as Yup from "yup";
import GoBackButton from "../../components/GoBackButton";

const esquemaPassageiro = Yup.object({
    nome: Yup.string().required("Informe seu nome."),
    email:Yup.string().email("Email inválido").required("Informe seu email."),
    cpf:Yup.string().required("Informe seu cpf."),
    senha:Yup.string().required("Informe a senha com a qual pretende se altenticar."),
    confirmacao:Yup.string().required("Confirme sua senha")
})


const errorMessageStyle = {backgroundColor:"#B40000",textColor:"#FFFFFF",duration:3000};
const successMessageStyle = {backgroundColor:"#1f6334",textColor:"#FFFFFF",duration:3000};
export default function CadastroPassageiro() {
    const [nome,setNome] = useState(null);
    const [email,setEmail] = useState(null);
    const [cpf,setCPF] = useState("");
    const [senha,setSenha] = useState("");
    const [confirSenha,setConfirSenha] = useState("");
    const [senhaVisivel,setSenhaVisivel] = useState(false);
    const [confirSenhaVisivel,setConfirSenhaVisivel] = useState(false);
    const [loading,setLoading] = useState(false);
    const navigation = useNavigation();

    const validarForm = async ()=>{
        const form = {
            nome : nome,
            email : email,
            cpf : cpf,
            senha : senha,
            confirmacao : confirSenha
        }

        const validation = {
            result:true ,
            message: "Usuário cadastrado com sucesso",
        }
        await esquemaPassageiro.validate(form)
        .then(()=>{
            if(form.senha != form.confirmacao){
                validation.result = false;
                validation.message= "A confirmação da senha não corresponde com a senha informada.";                
            }
        })
        .catch(e=>{
            validation.result = false;
            validation.message= e.errors[0];
        });

        return validation
    }

    
    const cadastrar = async () => {
        const validacao = await validarForm();
        if (validacao.result) {
            setLoading(true);
            const requestPayload = {
                name: nome,
                email: email,
                password: senha,
                cpf: cpf
            };
            console.log("payload", requestPayload);
            api.post("auth/singup?profile=passenger", requestPayload)
                .then(() => {
                    navigation.navigate('Login');
                    Toast.show(validacao.message, successMessageStyle);
                })
                .catch((e) => {
                    if (e.response && e.response.data) Toast.show(e.response.data.message, errorMessageStyle);
                    else Toast.show("Ocorreu um erro", errorMessageStyle);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            Toast.show(validacao.message, errorMessageStyle);
        }
    }

    const aplicarCPFMascara = (valor) => {
        setCPF(valor.replace(/[^\d]/g, "").replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, "$1.$2.$3-$4"));
    }

    return (
        <View style={estilos.page}> 
            <GoBackButton/> 
            <View style={estilos.form}>  
                <Text>Nome</Text>
                <TextInput editable={!loading} style={estilos.inputContainer} value={nome} onChangeText={setNome} />
                <Text>Email</Text>
                <TextInput editable={!loading} style={estilos.inputContainer} value={email} onChangeText={setEmail} />
                <Text>CPF</Text>
                <TextInput editable={!loading} style={estilos.inputContainer} value={cpf} onChangeText={aplicarCPFMascara} maxLength={14}/>
                <Text>Senha</Text>
                <View style={estilos.inputContainer}>
                    <TextInput editable={!loading} value={senha} secureTextEntry={!senhaVisivel} onChangeText={setSenha} />
                    <TouchableOpacity onPress={()=>setSenhaVisivel(!senhaVisivel)} style={estilos.visibleIcon}>
                        <MaterialIcons name={senhaVisivel?"visibility":"visibility-off" } size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <Text>Confirme Sua Senha</Text>
                    <View style={estilos.inputContainer}>
                        <TextInput editable={!loading} value={confirSenha} secureTextEntry={!confirSenhaVisivel} onChangeText={setConfirSenha} />
                        <TouchableOpacity onPress={()=>setConfirSenhaVisivel(!confirSenhaVisivel)} style={estilos.visibleIcon}>
                            <MaterialIcons name={confirSenhaVisivel?"visibility":"visibility-off"} size={24} color="white" />
                        </TouchableOpacity>
                    </View>
            </View>

            <View style={estilos.signupBtn}>
                {
                    loading?
                        <ActivityIndicator size="large" color="#2196f3"/>:
                        <TouchableOpacity >
                            <Button title="Cadastrar" onPress={()=>{
                                cadastrar()
                            }}/>
                        </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({

    visibleIcon:{
        backgroundColor:"#2196f3",
        position:"absolute",
        right:0,
        height:'100%',
        justifyContent:"center",
        width:'10%',
        alignItems:"center"
    },
    inputContainer:{
        position:"relative",
        borderWidth:1,
        borderColor:"#2196f3",
        borderRadius:5,
        marginBottom:6,
        paddingHorizontal:3
    },
    passwordInput:{
        width:'90%',
        backgroundColor:"#000000",
        
    },
    form:{
        paddingHorizontal:'2.5%',
        paddingVertical:"3%",
        marginBottom:'22%',
        borderWidth:1,
        borderColor:"#2196f3",
        borderRadius:5,
    },
    page:{
        height:'100%',
        justifyContent:"center",
        paddingHorizontal:'5%'
    },
    signupBtn:{
        paddingHorizontal:"25%"
    }
})