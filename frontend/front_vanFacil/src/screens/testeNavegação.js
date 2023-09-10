import React from "react";
import { StyleSheet ,View , TouchableOpacity,Text} from "react-native";
import { useNavigation} from "@react-navigation/native";
import GoBackButton from "../components/GoBackButton";

export default function TesteNavegação(){

    const navigation = useNavigation();

    return(
        <View style={estilo.page}>
            <GoBackButton/>
            <View style={estilo.buttonsContainer}>
                <Text style={estilo.title}>Como deseja utilizar o aplicativo?</Text>
                <TouchableOpacity style={estilo.btn} onPress={() => navigation.navigate('M_Inicial')}>
                    <Text style={estilo.btnText}>Como motorista</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilo.btn} onPress={() => navigation.navigate('CadastroPassageiro')}>
                    <Text style={estilo.btnText}>Como passageiro</Text>
                </TouchableOpacity>
             </View>
        </View>
    )
}

const estilo = StyleSheet.create({

    btn:{
        justifyContent: 'center',
        minWidth:"100%",
        borderRadius:7,
        backgroundColor:"#2297ef",
        alignItems:"center",
        paddingVertical:17,
    },
    btnText:{
        fontSize:20,
        color:"white",
    },
    page:{
        justifyContent:"center",
        alignItems:"center",
        height:"100%"
    },
    buttonsContainer:{
        width:"80%",
        justifyContent:"space-evenly",
        height:"35%",
        padding:"5%",
        borderWidth:1,
        borderColor:"#2196f3",
        borderRadius:10,
    },
    title:{
        minWidth:"100%",
        textAlign:"center",
        fontWeight:600,
        fontSize:20,
        color:"#828282"
    }

})