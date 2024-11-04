// * Form
import * as Yup from "yup";

// Schema for the Auth form
export const validationSchemaAuth = Yup.object().shape({
  email: Yup.string()
    .email("Por favor, insira um e-mail válido.")
    .required("E-mail é obrigatório."),
  password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .required("Senha é obrigatória."),
});
