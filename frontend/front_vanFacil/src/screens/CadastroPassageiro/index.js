import React , {useState,useRef,createContext, useContext} from "react";
import { 
    Button , 
    Text, 
    View , 
    TouchableOpacity , 
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import api from "../../services/api";
import { MaterialIcons } from '@expo/vector-icons'; 
import Toast from 'react-native-root-toast';
import { useNavigation} from "@react-navigation/native";
import * as Yup from "yup";
import GoBackButton from "../../components/GoBackButton";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView , {PROVIDER_GOOGLE , Marker}from 'react-native-maps';
import {Picker} from '@react-native-picker/picker';
import {
    GoogleSignin,
    statusCodes,
  } from '@react-native-google-signin/google-signin';


const SteperContext = createContext();
const campus = [{id:1,nome:"Barcelona"},{id:2,nome:"Centro"},{id:3,nome:"Conceição"}]

function Adress(){
    const {
        loading,
        endereco,setEndereco,
        complemento,setComplemento,
        phone,setPhone,
        selectedCampus, setSelectedCampus
    } = useContext(SteperContext);
    const mapRef = useRef(null);
    function getAdrresJson(array) {
        const jsonResult = {};
      
        for (const item of array) {
          if (item.types.includes("street_number")) {
            jsonResult.numero = parseInt(item.long_name);
          } else if (item.types.includes("route")) {
            jsonResult.logradouro = item.long_name;
          } else if (item.types.includes("sublocality_level_1")) {
            jsonResult.bairro = item.long_name;
          } else if (item.types.includes("administrative_area_level_2")) {
            jsonResult.cidade = item.long_name;
          } else if (item.types.includes("administrative_area_level_1")) {
            jsonResult.uf = item.short_name;
          } else if (item.types.includes("country")) {
            jsonResult.pais = item.long_name;
          }
        }
      
        return jsonResult;
      }
    const formatPhoneNumber = (text) => {
        // Remove qualquer caractere não numérico do texto.
        const cleanedText = text.replace(/\D/g, '');
      
        // Aplica a máscara "(99) 999999999".
        const match = cleanedText.match(/^(\d{0,2})(\d{0,9})$/);
        if (match) {
          let formattedText = '';
          
          if (match[1]) {
            formattedText += `(${match[1]}`;
          }
      
          if (match[2]) {
            formattedText += `) ${match[2]}`;
          }
      
          setPhone(formattedText);
        } else {
          setPhone(cleanedText);
        }
      };
    return(
        <View>
        <Text>Celular</Text>
        <TextInput maxLength={14} editable={!loading} style={estilos.inputContainer} value={phone} onChangeText={formatPhoneNumber}/>
        <Text>Endereço</Text>
        <GooglePlacesAutocomplete
            styles={
                {
                    container:{flex:0,},
                    listView:{position:"absolute",top:35,zIndex:999,height:100},
                    textInput:{height:32,borderWidth:1,borderColor:"#2196f3",borderRadius:5,}
                }
            }
            
        
            placeholder=''
            fetchDetails
            onPress={(data,details = null) => {
                if(!loading){
                    const {lat,lng} = details.geometry.location;
                    const endereco = getAdrresJson(details.address_components);
                    endereco.latitude = lat;
                    endereco.longitude = lng; 
                    setEndereco(endereco);                          
                    mapRef.current?.animateToRegion({
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.0005, 
                        longitudeDelta: 0.0005, 
                    })
                }
            }}
            query={{
                key: 'AIzaSyCRQi-6BPBTDYPF4SRAPOoEqnZhQeVyphk',
                language: 'pt-br',
                type:"geocode"
            }}
            />
            <MapView 
                ref={mapRef} 
                style={{width:"100%",height:170,zIndex:-1}} 
                provider={PROVIDER_GOOGLE}
                initialRegion={endereco.latitude && endereco.longitude?{
                    latitude: endereco.latitude,
                    longitude: endereco.longitude,
                    latitudeDelta: 0.0005, 
                    longitudeDelta: 0.0005, 
                }:undefined}
            >
                {endereco.latitude && endereco.longitude && (
                    <Marker
                    coordinate={{
                        latitude:endereco.latitude,
                        longitude:endereco.longitude
                    }}
                    />
                )}
            </MapView>
            <Text>Complemento</Text>
            <TextInput editable={!loading} style={estilos.inputContainer} value={complemento} onChangeText={setComplemento} />
            <Text>Em qual campus da uscs você estuda?</Text>
            <View style={{ borderWidth:1,borderColor:"#2196f3",borderRadius:5}}>
            <Picker
                enabled={!loading}
                style={{ width: '100%' }} // Ajuste a altura conforme necessário
                selectedValue={selectedCampus}
                onValueChange={(itemValue) => setSelectedCampus(itemValue)}
            >
                {campus.map((campus) => (
                <Picker.Item key={campus.id} label={campus.nome} value={campus.id} />
                ))}
            </Picker>
            </View>


        </View>
    )
}

function UserData(){
    const {
        nome,setNome,
        email,setEmail,
        senha,setSenha,
        confirSenha,setConfirSenha,
        cadastroGoogle,
        loading,
    } = useContext(SteperContext);
    const [senhaVisivel,setSenhaVisivel] = useState(false);
    const [confirSenhaVisivel,setConfirSenhaVisivel] = useState(false);
      

    return(
        <>
            <Text>Nome</Text>
            <TextInput editable={!(loading||cadastroGoogle)} style={estilos.inputContainer} value={nome} onChangeText={setNome} />
            <Text>Email</Text>
            <TextInput editable={!(loading||cadastroGoogle)} style={estilos.inputContainer} value={email} onChangeText={setEmail} />
            <Text>Senha</Text>
            <View style={estilos.inputContainer}>
                <TextInput editable={!(loading||cadastroGoogle)} value={senha} secureTextEntry={!senhaVisivel} onChangeText={setSenha} />
                <TouchableOpacity onPress={()=>setSenhaVisivel(!senhaVisivel)} style={estilos.visibleIcon}>
                    <MaterialIcons name={senhaVisivel?"visibility":"visibility-off" } size={24} color="white" />
                </TouchableOpacity>
            </View>
            <Text>Confirme Sua Senha</Text>
            <View style={estilos.inputContainer}>
                <TextInput editable={!(loading||cadastroGoogle)} value={confirSenha} secureTextEntry={!confirSenhaVisivel} onChangeText={setConfirSenha} />
                <TouchableOpacity onPress={()=>setConfirSenhaVisivel(!confirSenhaVisivel)} style={estilos.visibleIcon}>
                    <MaterialIcons name={confirSenhaVisivel?"visibility":"visibility-off"} size={24} color="white" />
                </TouchableOpacity>
            </View>
        </>
    )
}




const esquemaPassageiro = Yup.object({
    nome: Yup.string().required("Informe seu nome."),
    email:Yup.string().email("Email inválido").required("Informe seu email."),
    senha:Yup.string().required("Informe a senha com a qual pretende se altenticar."),
    confirmacao:Yup.string().required("Confirme sua senha")
})


const errorMessageStyle = {backgroundColor:"#B40000",textColor:"#FFFFFF",duration:3000};
const successMessageStyle = {backgroundColor:"#1f6334",textColor:"#FFFFFF",duration:3000};
export default function CadastroPassageiro() {
    const [nome,setNome] = useState(null);
    const [email,setEmail] = useState(null);
    const [phone,setPhone] = useState("");
    const [senha,setSenha] = useState("");
    const [confirSenha,setConfirSenha] = useState("");
    const [loading,setLoading] = useState(false);
    const [endereco,setEndereco] = useState({latitude:null,longitude:null});
    const [complemento,setComplemento] = useState(null);
    const [selectedCampus, setSelectedCampus] = useState(campus[0].id);
    const [step,setStep] = useState(0);
    const [cadastroGoogle,setCadastroGoogle] =  useState(false);
    const [googleToken, setGoogleToken] = useState("")

    const navigation = useNavigation();
    const lastStep = 1
	function ChoseConp(key) {
		switch (key) {
			case 0:
				return <UserData/> ;
			case 1:
				return <Adress/>;
		}
	}

    function nextFunction(){
        const condition = step<lastStep;
        if(condition) setStep(step+1);
        return condition;
    }
    function prevStep(){
        const condition = step>0;
        if(condition) setStep(step-1);
        return condition;
    }

    const validarForm = async ()=>{
        const form = {
            nome : nome,
            email : email,
            senha : senha,
            confirmacao : confirSenha
        }

        const validation = {
            result:true ,
            message: "Usuário cadastrado com sucesso",
        }
        if(!cadastroGoogle){
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
        }
        return validation
    }

    const singup = (validacao)=>{
        setLoading(true);
        const requestPayload = {
            name: nome,
            email: email,
            phone:phone,
            password: senha,
            campus_id:selectedCampus
        };
        if(endereco)requestPayload.address={...endereco,complemento}
        api.post("auth/singup?profile=passenger", requestPayload)
        .then(() => {
                navigation.navigate('Login');
                Toast.show(validacao.message, successMessageStyle);
            })
        .catch((e) => {
            console.log("error",e)
                if (e.response && e.response.data) Toast.show(e.response.data.message, errorMessageStyle);
                else Toast.show("Ocorreu um erro", errorMessageStyle);
            })
        .finally(() => {
                setLoading(false);
            });
    }

    const singupGoogle = (validacao)=>{
        setLoading(true);
        const requestPayload = {googleToken,address:{...endereco,complemento}};
        api.post("/auth/singup/google?profile=passenger",requestPayload)
        .then(() => {
            navigation.navigate('Login');
            Toast.show(validacao.message, successMessageStyle);
        })
        .catch((e) => {
                console.log("error!!!!!!!",e)
                if (e.response && e.response.data) Toast.show(e.response.data.message, errorMessageStyle);
                else Toast.show("Ocorreu um erro", errorMessageStyle);
            })
        .finally(() => {
                setLoading(false);
            });
    }
    
    const cadastrar = async () => {
        const validacao = await validarForm();
        if (validacao.result) {
            const isNotLast = nextFunction();
            if(!isNotLast){
                if(cadastroGoogle){
                    singupGoogle(validacao);
                }
                else{
                    singup(validacao);
                }
            }
        } else {
            Toast.show(validacao.message, errorMessageStyle);
        }
    }

    return (
        <SteperContext.Provider value={{
            nome,setNome,
            email,setEmail,
            phone,setPhone,
            senha,setSenha,
            confirSenha,setConfirSenha,
            loading,setLoading,
            endereco,setEndereco,
            complemento,setComplemento,
            selectedCampus, setSelectedCampus,
            cadastroGoogle,setCadastroGoogle,
        }}>
            <View style={estilos.page}> 
                {!loading && <GoBackButton onGoBack={prevStep}/>} 
                <View style={estilos.form}>  
                    {ChoseConp(step)}
                </View>

                <View style={estilos.signupBtn}>
                    {
                        loading?
                            <ActivityIndicator size="large" color="#2196f3"/>:
                            <TouchableOpacity >
                                <Button title={step===lastStep?"Cadastrar":"Continuar"} onPress={()=>{
                                    cadastrar()
                                }}/>
                            </TouchableOpacity>
                    }
                    {
                        step==0 && !cadastroGoogle &&
                        <TouchableOpacity style={{marginTop:10}}>
                        <Button title={'Cadastrar com google'} onPress={() =>  {
                            GoogleSignin.hasPlayServices().then((hasPlayService) => {
                                    if (hasPlayService) {
                                        GoogleSignin.signIn().then( async(userInfo) => {
                                            console.log(userInfo.user.email,userInfo.user.name)
                                            if(userInfo.user && userInfo.user.email && userInfo.user.name){
                                                setEmail(userInfo.user.email);
                                                setNome(userInfo.user.name);
                                                setCadastroGoogle(true);
                                                setGoogleToken((await GoogleSignin.getTokens()).accessToken)
                                                nextFunction()
                                            }
                                            GoogleSignin.signOut()
                                        }).catch((e) => {
                                        console.log("ERROR IS 123: " + JSON.stringify(e));
                                        })
                                    }
                            }).catch((e) => {
                                console.log("ERROR IS: " + JSON.stringify(e));
                            })
                            }} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
         </SteperContext.Provider>
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
        marginBottom:'10%',
        borderWidth:1,
        borderColor:"#2196f3",
        borderRadius:5,
        overflow:"visible",
        marginTop:40,
        padding:25
    },
    page:{
        height:'100%',
        justifyContent:"center",
        paddingHorizontal:'5%',
    },
    signupBtn:{
        paddingHorizontal:"25%",
    }
})