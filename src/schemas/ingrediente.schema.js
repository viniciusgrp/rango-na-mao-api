import * as yup from "yup";

export const createIngredienteSchema = yup.object().shape({
  nome: yup.string().required("Nome é um campo obrigatório"),
  descricao: yup.string(),
});
