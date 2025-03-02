import * as yup from "yup";

export const createUserShape = yup.object().shape({
  nome: yup.string().required("Nome é um campo obrigatório"),
  email: yup.string().email().required("Email é um campo obrigatório"),
  senha: yup.string().required("Senha é um campo obrigatório"),
  telefone: yup.string().required("Telefone é um campo obrigatório"),
  cpf: yup.string().required("CPF é um campo obrigatório"),
  dataNascimento: yup
    .date()
    .required("Data de nascimento é um campo obrigatório"),
  tipoUsuario: yup.number().default(1),
  validado: yup.boolean().default(false),
});

export const updateUserShape = yup.object().shape({
  userId: yup.number(),
  nome: yup.string(),
  email: yup.string().email(),
  telefone: yup.string(),
  cpf: yup.string(),
  dataNascimento: yup.date(),
  tipoUsuario: yup.number(),
  validado: yup.boolean(),
});
