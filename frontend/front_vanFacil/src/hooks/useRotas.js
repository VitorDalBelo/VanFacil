import { useState, useEffect } from 'react';

import { carregaRotas } from '../services/carregaDados';

export default function useRotas() {
   const [rotas, setRotas] = useState({});

   useEffect(() => {
      const retorno = carregaRotas();
      setRotas(retorno);
   }, []);

   return rotas;
}
