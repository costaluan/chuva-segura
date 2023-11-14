import * as yup from "yup";

export const createUserSchema = yup.object().shape({
    name: yup
        .string()
        .required("O nome é obrigatório")
        .min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: yup
        .string()
        .email("Deve estar no formato de e-mail")
        .required("O e-mail é obrigatório"),
    password: yup.string()
        .required('A senha é obrigatória')
        .min(6, 'A senha deve ter pelo menos 6 caracteres'),
    cpf: yup.string().required("O CPF é obrigatório"),
    birth_date: yup.string().required("A data de nascimento é obrigatória"),
    city: yup.string().required("A cidade é obrigatória")
});

export const createOcurrencySchema = yup.object().shape({
    title: yup
        .string()
        .required("O título é obrigatório")
        .min(3, "O título deve ter pelo menos 3 caracteres"),
    description: yup
        .string()
        .required("A descrição é obrigatório"),
    category: yup.string()
        .required('A categoria é obrigatória'),
    status: yup.string()
        .required('O status é obrigatório'),
    risk_level: yup.string()
        .required('O nível de risco é obrigatório'),

});