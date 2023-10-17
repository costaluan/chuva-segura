import React, { useState } from "react";
import { Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native'

// import ImagePicker from "../../components/ImagePicker";
import CityPicker from "../../components/CityPicker";
// import DatePicker from "../../components/DatePicker";
import TextInput from "../../components/TextInput";
import { createUserSchema } from "../../utils/createUserValidation";
import { format } from 'date-fns';
import api from '../../services/api';
import { Container, ErrorText, Header, FormArea, InputContainer, Label, ScrollViewContent, StyledSwitch, Button, ButtonText } from './styles';

export default function CreateUser() {
    const navigation = useNavigation();
    const [showDatePicker, setShowDatePicker] = useState(false);

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            cpf: "",
            birth_date: new Date(),
            city: "",
            // admin: true,
            // salary: "",
            // image: "teste",
        },
        resolver: yupResolver(createUserSchema),
    });

    const onSubmit = async (data) => {
        Keyboard.dismiss();

        try {
            const birthDate = format(new Date(data.birth_date), 'yyyy-MM-dd');

            const dataApi = {
                name: data.name,
                email: data.email.toLowerCase(),
                password: data.password,
                cpf: data.cpf,
                birth_date: birthDate,
                // admin: data.admin,
                // salary: data.salary.toString(),
                city: data.city,
                // image: data.image,
            };
            //console.log(dataApi);

            // Envie os dados para a API
            await api.post('/users', dataApi);

            // Limpe os campos após o envio bem-sucedido
            reset({
                name: "",
                email: "",
                cpf: "",
                birth_date: new Date(),
                admin: false,
                salary: "",
                city: "",
                image: "teste",
            });
            navigation.navigate('Home')
        } catch (error) {
            // Lide com erros de envio para a API aqui
            console.error("Erro ao enviar dados:", error.message);
        }
    }

    return (
        <Container>
            <ScrollViewContent>
                <Header>Cadastro de Usuário</Header>
                <FormArea>
                    <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>Nome</Label>
                                    <TextInput
                                        name="name"
                                        placeholder="Nome"
                                        onChange={onChange}
                                        value={value}
                                        error={errors.name}
                                    />
                                </>
                            )}
                            name="name"
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>E-mail</Label>
                                    <TextInput
                                        name="email"
                                        placeholder="E-mail"
                                        onChange={onChange}
                                        value={value}
                                        error={errors.email}
                                    />
                                </>
                            )}
                            name="email"
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>Senha</Label>
                                    <TextInput
                                        name="password"
                                        placeholder="Senha"
                                        onChange={onChange}
                                        value={value}
                                        secureTextEntry={true}
                                        error={errors.password}
                                    />
                                </>
                            )}
                            name="password"
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>CPF</Label>
                                    <TextInput
                                        name="cpf"
                                        placeholder="CPF"
                                        onChange={onChange}
                                        value={value}
                                        error={errors.cpf}
                                        keyboardType="numeric"
                                    />
                                </>
                            )}
                            name="cpf"
                        />
                    </InputContainer>

                    {/* <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>Data de Nascimento</Label>
                                    <DatePicker
                                        value={value}
                                        onChange={onChange}
                                        showPicker={showDatePicker}
                                        setShowPicker={setShowDatePicker}
                                    />
                                    {errors.birth_date && <ErrorText>{errors.birth_date.message}</ErrorText>}
                                </>
                            )}
                            name="birth_date"
                        />
                    </InputContainer> */}

                    {/* <InputContainer>
                        <Label>Admin:</Label>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <StyledSwitch
                                    value={value}
                                    onValueChange={onChange}
                                />
                            )}
                            name="admin"
                        />
                        {errors.admin && <ErrorText>{errors.admin.message}</ErrorText>}
                    </InputContainer> */}

                    {/* <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>Salário</Label>
                                    <TextInput
                                        name="salary"
                                        placeholder="Salário"
                                        onChange={onChange}
                                        value={value}
                                        error={errors.salary}
                                        keyboardType="numeric"
                                    />
                                </>
                            )}
                            name="salary"
                        />
                    </InputContainer> */}

                    <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>Cidade</Label>
                                    <CityPicker
                                        control={control}
                                        value={value}
                                        onChange={onChange}
                                        errors={errors}
                                    />
                                </>
                            )}
                            name="city"
                        />
                    </InputContainer>

                    {/* <InputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <Label>Imagem</Label>
                                    <ImagePicker
                                        onChange={onChange}
                                        value={value}
                                    />
                                    {errors.image && <ErrorText>{errors.image.message}</ErrorText>}
                                </>
                            )}
                            name="image"
                        />
                    </InputContainer> */}
                </FormArea>
                <InputContainer>
                    <Button onPress={handleSubmit(onSubmit)}>
                        <ButtonText>Cadastrar</ButtonText>
                    </Button>
                    {/* <Button onPress={() => navigation.goBack()}>
                        <ButtonText>Voltar</ButtonText>
                    </Button> */}
                </InputContainer>

            </ScrollViewContent>
        </Container>
    );
}