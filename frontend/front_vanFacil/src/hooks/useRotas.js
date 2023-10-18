import { carregaRotas } from '../services/carregaDados';
import api from '../services/api';

export default async function useRotas() {
      let resposta = {
         status:false,
         trips:[]
      }
     await api.get("/users/trips")
      .then(resp=>{
         const {trips} = resp.data;
         resposta  = {
            status:true,
            trips
         }
      })

      return resposta
    

}
