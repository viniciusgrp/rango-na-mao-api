import * as yup from "yup";

export const createUpdatePedidoSchema = yup.object().shape({
  personalizaIngredientes: yup.array().of(
    yup.object().shape({
      ingredienteId: yup.number(),
      quantidade: yup.number(),
    })
  ),
  valorTotal: yup.number(),
  enderecoId: yup.number(),
  status: yup.string(),
  entrega: yup.object().shape({
    taxa: yup.number(),
    freteGratis: yup.boolean(),
    prazo: yup.number(),
  }),
  observacao: yup.string(),
  formaDePagamento: yup.string(),
  produtos: yup.array().of(
    yup.object().shape({
      produtoId: yup.string(),
      quantidade: yup.number(),
    })
  ),
});
