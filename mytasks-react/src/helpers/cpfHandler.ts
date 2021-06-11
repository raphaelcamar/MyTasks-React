export const CpfHandler = (cpf: string): string =>{ 

  if(cpf.length === 3){
    return cpf + '.';
  }
  if(cpf.length === 7){
    return cpf + '.';
  }

  if(cpf.length === 11){
    return cpf + '-'
  }

  return cpf;
}