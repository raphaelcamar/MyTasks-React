
type formProps = {
  name: string;
  password: string;
  email: string;
  cpf: string;
}

export default function validateForm(form: formProps){
  const {name, email, cpf} = form;

  const cpfValidated = validateCpf(cpf);
  const emailValidated = validateEmail(email);
  const nameValidated = validateName(name);

  return {
    name: nameValidated,
    cpf: cpfValidated,
    email: emailValidated,
  }
}

function validateName(str: string){
  let ver = true;
  if(str.length <= 0){
    return false
  }

  str.split(' ').forEach((nome) =>{
    const reg = /^[A-ZÀ-Úa-zà-ú]{1}[a-zà-ú]+$/;
    if(!reg.test(nome)) ver = false;
    });

    return ver
}

function validateCpf(cpf){
  const reg =  /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  return reg.test(cpf);
}

function validateEmail(email: string){
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
  return reg.test(email);
}