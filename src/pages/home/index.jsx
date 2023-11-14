import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {Container, Header, Button, ButtonText, ButtonNewOcurrency, Warning} from './styles';
import { AuthContext } from '../../../auth/src/context/auth';
import api from '../../services/api';
import UsersList from '../../components/UserList';


export default function Home() {
    const { loading } = useContext(AuthContext);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    async function loadUsers() {
        try {
            setLoadingUsers(true);
            const token = await AsyncStorage.getItem('@authToken');
            const response = await api.get('occurrences?order_by[column]=created_at&order_by[direction]=desc', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data.data);
            setFilteredUsers(response.data.data);
        } catch (error) {
            console.error('Erro ao carregar os usuários:', error);
        } finally {
            setLoadingUsers(false);
            setRefreshing(false);
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
        loadUsers();
    };

    useEffect(() => {
        if (isFocused) {
            loadUsers();
        }
    }, [isFocused]);

    if (loadingUsers || loading) {
        return (
            <Container>
                <ActivityIndicator size={36} color="#000" />
            </Container>
        )
    }

    return (
        <Container>
            {filteredUsers.length > 0 ? (
                <>
                    <Header>
                        <Button onPress={() => console.log('Ordena por KM mais próxima')}>
                            <ButtonText>Ocorrências perto de você</ButtonText>
                        </Button>

                        <ButtonNewOcurrency
                            onPress={() => navigation.navigate('CreateOccurrence')}>
                            <ButtonText style={{ textAlign: 'center', fontSize: 12 }}>Nova Ocorrência</ButtonText>
                        </ButtonNewOcurrency>
                    </Header>

                    <FlatList
                        data={filteredUsers}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <UsersList data={item} />}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />
                </>
            )
                :
                <Warning>Sem resultados</Warning>
            }

        </Container>
    )
}
