import * as yup from "yup";

export const createProdutoSchema = yup.object().shape({
  nome: yup.string().required("Nome é um campo obrigatório"),
  descricao: yup.string(),
  preco: yup.number().required("Preço é um campo obrigatório"),
  servePessoas: yup.number(),
  ingredientes: yup.array(),
  removeIngredientes: yup.boolean(),
  custoProducao: yup.number(),
  valorDesconto: yup.number(),
  foto: yup.string(),
  adicionais: yup.boolean(),
  categoria: yup.number()
});
