import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, RefreshControl } from 'react-native';
import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import MapView, { Marker } from 'react-native-maps';
import backgroundImg from '../../../assets/Rectangle5.svg';
import api from '../../services/api';
import {
    Container,
    ScrollViewContent,
    Card,
    BackgroundImage,
    BackgroundText,
    Label,
    Text2 as StyledText,
    StyledTextDate,
    StyledTextDescription,
    StyledTextData,
    StyledTextImage,
    Button,
    ButtonText,
    ModalBackground,
    ModalButton,
    ModalButtonContainer,
    ModalButtonText,
    ModalContainer,
    ModalContent,
    ModalText
} from './styles';

function Details() {
    const route = useRoute();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [user, setUser] = useState();
    const [loadingUser, setLoadingUser] = useState(false);
    const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [imageExists, setImageExists] = useState(false);

    const openConfirmationModal = () => {
        setConfirmationModalVisible(true);
    };

    const closeConfirmationModal = () => {
        setConfirmationModalVisible(false);
    };

    async function loadUser() {
        try {
            setLoadingUser(true);

            const token = await AsyncStorage.getItem('@authToken');
            const response = await api.get(`occurrences/${route.params?.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.data)
            if (response.data.data.image === "/opt/render/project/src/build/public/uploads/default.jpg") {
                setImageExists(false)
            } else {
                setImageExists(true)
            }
            setUser(response.data.data);
        } catch (error) {
            console.error('Erro ao carregar os usuários:', error);
        } finally {
            setLoadingUser(false);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        console.log(isFocused)
        if (isFocused) {
            loadUser();
        }
    }, [isFocused]);

    async function deleteUser(id) {
        try {
            const token = await AsyncStorage.getItem('@authToken');

            const response = await api.delete(`occurrences/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                navigation.goBack();
                console.log("Usuário deletado com sucesso");
            } else if (response.status === 404) {
                console.error("Usuário não encontrado");
            } else {
                console.error("Erro ao deletar o usuário");
            }
        } catch (error) {
            console.error('Erro ao carregar os usuários:', error);
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        loadUser();
    };

    const riskLevel = () => {
        if (user.risk_level) {
            switch (user.risk_level) {
                case 1: return 'Muito baixo'
                case 2: return 'Baixo'
                case 3: return 'Médio'
                case 4: return 'Alto'
                case 5: return 'Muito alto'
            }
        }
    }

    if (loadingUser) {
        return (
            <Container>
                <ActivityIndicator size={36} color="#000" />
            </Container>
        )
    }

    return (
        <>
            {user && (
                <>
                    <BackgroundImage source={backgroundImg}>
                        <BackgroundText>{user.title}</BackgroundText>
                    </BackgroundImage>

                    <Container>
                        <ScrollViewContent
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        >

                            <Card>
                                <StyledTextDate>{format(new Date(user.created_at), 'dd/MM/yyyy')}</StyledTextDate>
                                <Label>Descrição</Label>
                                <StyledTextDescription>{user.description}</StyledTextDescription>
                                <Label>Categoria</Label>
                                <StyledTextData>{user.category}</StyledTextData>
                                <Label>Nível de Risco</Label>
                                <StyledTextData>{riskLevel()}</StyledTextData>
                                <Label>Status</Label>
                                <StyledTextData>{user.status}</StyledTextData>
                                <Label>Fotografia da Ocorrência</Label>
                                {imageExists &&
                                    <Image
                                        style={{ width: '100%', height: 250, marginBottom: 12 }}
                                        source={{ uri: `https://crud-user-mftn.onrender.com/occurrences/image/${route.params?.id}` }}
                                    />
                                }

                                <Label>Localização</Label>
                                <StyledTextData>{`Latitude: ${Number.parseFloat(user.lati).toFixed(6)}`}</StyledTextData>
                                <StyledTextData>{`Longitude: ${Number.parseFloat(user.long).toFixed(6)}`}</StyledTextData>
                                {user.lati !== 0 && user.lati !== 0 && (
                                    <MapView
                                        style={{ width: '100%', height: 300, marginTop: 12 }}
                                        initialRegion={{
                                            lati: -29.702968,
                                            long: -53.512025,
                                            latiDelta: 0.0922,
                                            longDelta: 0.0421,
                                        }}
                                    >

                                        <Marker
                                            coordinate={{
                                                lati: -29.702968,
                                                long: -53.512025,
                                            }}
                                            title="Minha Localização"
                                            description="Estou aqui!"
                                        />
                                    </MapView>
                                )}


                            </Card>

                            <Button onPress={openConfirmationModal}>
                                <ButtonText>Excluir</ButtonText>
                            </Button>

                            <Button onPress={() => navigation.goBack()}>
                                <ButtonText>Lista de Ocorrências</ButtonText>
                            </Button>

                            <ModalContainer
                                visible={isConfirmationModalVisible}
                                transparent={true}
                                animationType="slide"
                            >
                                <ModalBackground>
                                    <ModalContent>
                                        <ModalText>Tem certeza de que deseja excluir este usuário?</ModalText>
                                        <ModalButtonContainer>
                                            <ModalButton onPress={() => deleteUser(user.id)}>
                                                <ModalButtonText>Confirmar</ModalButtonText>
                                            </ModalButton>
                                            <ModalButton onPress={closeConfirmationModal}>
                                                <ModalButtonText>Cancelar</ModalButtonText>
                                            </ModalButton>
                                        </ModalButtonContainer>
                                    </ModalContent>
                                </ModalBackground>
                            </ModalContainer>
                        </ScrollViewContent>
                    </Container>
                </>
            )}
        </>
    );
}

export default Details;
