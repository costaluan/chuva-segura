import React, { useState, useEffect } from "react";
import { Keyboard, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import ImagePicker from "../../components/ImagePicker";
import TextInput from "../../components/TextInput";
import CategoryPicker from "../../components/CategoryPicker";
import RiskLevelPicker from "../../components/RiskLevelPicker";
import StatusPicker from "../../components/StatusPicker";
import { createOcurrencySchema } from '../../utils/createUserValidation';
import api from '../../services/api';
import backgroundImg from '../../../assets/Rectangle5.svg';
import {
    BackgroundImage,
    BackgroundText,
    BackgroundTextAlt,
    Container,
    ContainerLoading,
    ErrorText,
    FormArea,
    InputContainer,
    Label,
    ScrollViewContent,
    Button,
    ButtonText
} from './styles';


export default function App() {
    const navigation = useNavigation();
    const [loadingUser, setLoadingUser] = useState(false);


    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRiskLevel, setSelectedRiskLevel] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const categoryOptions = ["enchente", "deslizamento", "bloqueio"];
    const riskLeveOptions = ["1", "2", "3", "4", "5"]
    const statusOptions = ["preventivo", "ocorrido"]

    const [mapRegion, setMapRegion] = useState({
        lati: -29.698638657622553,
        long: -53.51801818953788,
        latiDelta: 0.0922,
        longDelta: 0.0421,
    });

    const [localizacao, setLocalizacao] = useState({
        lati: -29.698638657622553,
        long: -53.51801818953788
    });

    const handleGetLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                alert('A permissão de localização é necessária para usar esta funcionalidade.');
                return;
            }

            const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            const { lati, long } = coords;

            setLocalizacao({
                lati: lati,
                long: long
            });

            setMapRegion({
                lati: lati,
                long: long,
                latiDelta: 0.0922,
                longDelta: 0.0421,
            });
        } catch (error) {
            console.error('Erro ao obter a localização:', error);
        }
    };

    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(createOcurrencySchema),
    });

    useEffect(() => {
        handleGetLocation()
        setValue("title", "");
        setValue("description", "");
        setValue("category", "");
        setValue("status", "");
        setValue("risk_level", "");
        setValue("lati", "");
        setValue("long", "");
    }, []);

    const onSubmit = async (data) => {
        Keyboard.dismiss();

        try {
            console.log(data)
            const dataApi = new FormData();
            const token = await AsyncStorage.getItem('@authToken');

            dataApi.append("title", data.title);
            dataApi.append("description", data.description);
            dataApi.append("category", data.category);
            dataApi.append("status", data.status);
            dataApi.append("risk_level", Number(data.risk_level));
            dataApi.append("lati", Number(localizacao.lati));
            dataApi.append("long", Number(localizacao.long));

            if (data.image) {
                const photo = {
                    uri: data.image,
                    type: "image/jpeg",
                    name: "photo.jpg",
                };
                console.log(data.image)
                dataApi.append("image", photo);
            }
            console.log(dataApi)

            await api.post(`/occurrences`, dataApi, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigation.navigate('Home');
        } catch (error) {
            console.error("Erro ao registrar dados:", error.message);
        }
    }

    if (loadingUser) {
        return (
            <ContainerLoading>
                <ActivityIndicator size={36} color="#000" />
            </ContainerLoading>
        )
    }

    return (
        <>
            <BackgroundImage source={backgroundImg}>
                <BackgroundText>Criar Ocorrência</BackgroundText>
                <BackgroundTextAlt>Insira os seus dados</BackgroundTextAlt>
            </BackgroundImage>
            <Container>
                <ScrollViewContent>

                    <FormArea>
                        <InputContainer>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Label>Título</Label>
                                        <TextInput
                                            name="title"
                                            placeholder="Título"
                                            onChange={onChange}
                                            value={value}
                                            error={errors.title}
                                        />
                                    </>
                                )}
                                name="title"
                            />
                        </InputContainer>

                        <InputContainer>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Label>Descrição</Label>
                                        <TextInput
                                            name="description"
                                            placeholder="Descrição"
                                            onChange={onChange}
                                            value={value}
                                            error={errors.description}
                                        />
                                    </>
                                )}
                                name="description"
                            />
                        </InputContainer>

                        <InputContainer>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Label>Categoria</Label>
                                        <CategoryPicker
                                            control={control}
                                            value={selectedCategory}
                                            onChange={setSelectedCategory}
                                            errors={errors}
                                            options={categoryOptions}
                                        />
                                    </>
                                )}
                                name="category"
                            />
                        </InputContainer>

                        <InputContainer>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Label>Nível de Risco</Label>
                                        <RiskLevelPicker
                                            control={control}
                                            value={selectedRiskLevel}
                                            onChange={setSelectedRiskLevel}
                                            errors={errors}
                                            options={riskLeveOptions}
                                        />
                                    </>
                                )}
                                name="risk_level"
                            />
                        </InputContainer>

                        <InputContainer>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Label>Status</Label>
                                        <StatusPicker
                                            control={control}
                                            value={selectedStatus}
                                            onChange={setSelectedStatus}
                                            errors={errors}
                                            options={statusOptions}
                                        />
                                    </>
                                )}
                                name="status"
                            />
                        </InputContainer>


                        <InputContainer>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Label>Fotografia da Ocorrência</Label>
                                        <ImagePicker
                                            onChange={onChange}
                                            value={value}
                                        />
                                        {errors.image && <ErrorText>{errors.image.message}</ErrorText>}
                                    </>
                                )}
                                name="image"
                            />
                        </InputContainer>

                        <MapView
                            style={{ width: '100%', height: 300, marginTop: 12 }}
                            initialRegion={{
                                lati: localizacao.lati,
                                long: localizacao.long,
                                latiDelta: 0.0922,
                                longDelta: 0.0421,
                            }}
                            region={mapRegion}
                        >

                            <Marker
                                coordinate={{
                                    lati: localizacao.lati,
                                    long: localizacao.long,
                                }}
                                title="Minha Localização"
                                description="Estou aqui!"
                            />
                        </MapView>


                    </FormArea>
                    <InputContainer>
                        <Button onPress={handleSubmit(onSubmit)}>
                            <ButtonText>Cadastrar</ButtonText>
                        </Button>
                        <Button onPress={() => navigation.goBack()}>
                            <ButtonText>Voltar</ButtonText>
                        </Button>
                    </InputContainer>

                </ScrollViewContent>
            </Container>
        </>
    );
}