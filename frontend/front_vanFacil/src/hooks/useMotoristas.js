import { useState, useEffect } from 'react';

import { carregaMotoristas } from '../services/carregaDados';

export default function useMotoristas() {
   const [motoristas, setMotoristas] = useState({});

   useEffect(() => {
      const retorno = carregaMotoristas();
      setMotoristas(retorno);
   }, []);

   return motoristas;
}
