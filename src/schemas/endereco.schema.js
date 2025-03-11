import * as yup from "yup";

export const createEnderecoSchema = yup.object().shape({
    logradouro: yup.string().required("Logradouro é um campo obrigatório"),
    numero: yup.number().required("Número é um campo obrigatório"),
    cep: yup.string().required("CEP é um campo obrigatório"),
    bairro: yup.string().required("Bairro é um campo obrigatório"),
    cidade: yup.string().required("Cidade é um campo obrigatório"),
    estado: yup.string().required("Estado é um campo obrigatório"),
    enderecoPrincipal: yup.boolean(),
    complemento: yup.string(),
    referencia: yup.string(),
    nomeParaEntrega: yup.string(),
    telefoneParaContato: yup.string(),
    observacao: yup.string(),
  });