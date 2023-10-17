import React , {useState,useContext} from "react"
import { Button , Text, View , TouchableOpacity ,StyleSheet , ActivityIndicator } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import * as Yup  from "yup";
import toast from "../../helpers/toast";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation} from "@react-navigation/native";
import { AuthContext } from "../../context/Auth/AuthContext";

import Texto from "../../components/Texto";
import cores from "../../../assets/cores";
import { GoogleSignin,statusCodes, } from '@react-native-google-signin/google-signin';


const esquemaLogin = Yup.object({
    senha:Yup.string().required("Informe a senha do seu usuário"),
    email:Yup.string().email("Email inválido.").required("Informe o email cadastrado."),
})
export default function Login(){
    const [email,setEmail] = useState("");
    const [senha , setSenha] = useState("");
    const [loading,setLoading] = useState(false);
    const [senhaVisivel,setSenhaVisivel] = useState(false);
    const navigation = useNavigation();
    const {handleLogin,handleGoogleLogin,handleLogout} = useContext(AuthContext);

    const validarForm = async ()=>{
        const form = {
            email: email,
            senha: senha
        };
        const validation ={
            result:true,
            message:""
        };
        await esquemaLogin.validate(form)
        .catch(err=>{
            validation.result=false;
            validation.message=err.errors[0]
        });

        return validation;
    }

    const login = async ()=>{
        const basicValidation = await validarForm();
        if(basicValidation.result){
            setLoading(true)
            await handleLogin(email,senha)
            setLoading(false);
        }
        else{
            toast(basicValidation.message,"error");
        }
            
    }
    return (
        <View style={estilos.page}> 
            <View>
                <Texto>Email</Texto>
                <TextInput editable={!loading} style={estilos.inputContainer} value={email} onChangeText={setEmail} />
                <Texto>Senha</Texto>
                <View style={estilos.inputContainer}>
                    <TextInput editable={!loading} value={senha} secureTextEntry={!senhaVisivel} onChangeText={setSenha} />
                    <TouchableOpacity onPress={()=>setSenhaVisivel(!senhaVisivel)} style={estilos.visibleIcon}>
                        <MaterialIcons name={senhaVisivel?"visibility":"visibility-off" } size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View styles>
                {
                        loading?
                            <ActivityIndicator size="large" color="#2196f3"/>:
                            <>
                            <TouchableOpacity style={estilos.btnEntrar} onPress={()=>{login() }}>
                                <Texto style={estilos.txtBotao}>{"ENTRAR"}</Texto>
                    
                            </TouchableOpacity>
                            <TouchableOpacity >
                                  <Button  title={'Entre com o google'} onPress={() =>  {
                                    GoogleSignin.hasPlayServices().then((hasPlayService) => {
                                            if (hasPlayService) {
                                                GoogleSignin.signIn().then( async(userInfo) => {
                                                  const {accessToken} = await GoogleSignin.getTokens()
                                                  GoogleSignin.signOut()
                                                  handleGoogleLogin(accessToken)
                                                }).catch((e) => {
                                                console.log("ERROR IS: " + JSON.stringify(e));
                                                })
                                            }
                                    }).catch((e) => {
                                        console.log("ERROR IS: " + JSON.stringify(e));
                                    })
                                    }} />
                            </TouchableOpacity>
                            </>
                }

                    <Text onPress={()=> {if(!loading)navigation.navigate('Navegação');}}>Não possue conta ainda? Cadastre-se! </Text>

                </View>
            </View> 
        </View>
    )
}


const estilos = StyleSheet.create({

    visibleIcon:{
        backgroundColor:cores.azulProfundo,
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
        borderColor:cores.azulProfundo,
        borderRadius:5,
        marginBottom:6,
        paddingHorizontal:3
    },
    passwordInput:{
        width:'90%',
        backgroundColor:cores.branco,
        
    },
    form:{
        paddingHorizontal:'2.5%',
        paddingVertical:"3%",
        marginBottom:'22%',
        borderWidth:1,
        borderColor:cores.azulProfundo,
        borderRadius:5,
    },
    page:{
        height:'100%',
        justifyContent:"center",
        paddingHorizontal:'5%'
    },
    btnEntrar:{
        justifyContent:"center",
        alignItems: "center",
        height: 40,
        backgroundColor:cores.azulProfundo,
        borderRadius:5,
        marginVertical:10,

    },
    txtBotao:{
        color:cores.branco,
        fontWeight: "bold",

    }
})