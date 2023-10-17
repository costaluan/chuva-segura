import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
// import UsersList from '../../components/UsersList';
// import Search from '../../components/Search';
import {
    Container,
    Header,
    Message,
    Title,
    List,
    Button,
    ButtonText,
    Warning
} from './styles'

import { AuthContext } from '../../../auth/src/context/auth';

import { useNavigation, useIsFocused } from '@react-navigation/native'

export default function Home() {
    const { user, signOut, loading } = useContext(AuthContext);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);

    async function loadUsers() {
        try {
            setLoadingUsers(true);
            const response = await api.get('users');
            console.log(response)
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error('Erro ao carregar os usuários:', error);
        } finally {
            setLoadingUsers(false);
        }
    }

    useEffect(() => {
        if (isFocused) {
            loadUsers();
        }
    }, [setFilteredUsers, isFocused]);

    const handleFilterChange = (filterText) => {
        if (filterText === '') {
            //console.log(users)
            setFilteredUsers(users);
        } else {
            const filtered = users.filter((user) =>
                user.name.toLowerCase().includes(filterText.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    };

    async function deleteUser(id) {
        //console.log(id);
        try {
            const token = await AsyncStorage.getItem('@authToken');

            const response = await api.delete(`users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                loadUsers();
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

    if (loadingUsers || loading) {
        return (
            <Container>
                <ActivityIndicator size={36} color="#000" />
            </Container>
        )
    }
    console.log(filteredUsers.length)
    return (
        <Container>
            {filteredUsers.length > 0 ? (
                <>
                    <Header>
                        <Message>
                            {user && `Hey ${user.email}`}
                        </Message>

                        <Button onPress={() => navigation.navigate('CreateUser')}>
                            <ButtonText>Criar usuário</ButtonText>
                        </Button>

                        <Button onPress={() => signOut()}>
                            <ButtonText>Sair</ButtonText>
                        </Button>
                    </Header>

                    <Title>Teste</Title>
                    {/* <Search onFilterChange={handleFilterChange} /> */}

                    {/* <List
                        data={filteredUsers}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <UsersList data={item} onDelete={deleteUser} />}
                    /> */}
                </>
            )
                :
                <Warning>Sem resultados...</Warning>
            }

        </Container>
    )
}