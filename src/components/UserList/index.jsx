import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import {
  Card,
  TitleDate,
  Titulo,
  DataOcurrencies,
  DataOcurrency,
  Data,
  Botao,
  BotaoTexto
} from './styles';

export default function UsersList({ data }) {
  const navigation = useNavigation();

  function handleDetails() {
    navigation.navigate("DetailsUser", { id: data.id });
  }

  const dateReady = format(new Date(data.created_at), 'dd/MM/yyyy');
  const riskLevel = () => {
    switch (data.risk_level) {
      case 1: return 'Muito baixo'
      case 2: return 'Baixo'
      case 3: return 'Médio'
      case 4: return 'Alto'
      case 5: return 'Muito alto'
    }
  }

  return (
    <Card>
      <TitleDate>
        <Titulo>{data.title}</Titulo>
        <Data>{dateReady}</Data>
      </TitleDate>

      <Titulo>{data.description}</Titulo>
      <DataOcurrencies>
        <DataOcurrency>{data.category}</DataOcurrency>
        <DataOcurrency>{riskLevel()}</DataOcurrency>
        <DataOcurrency>{data.status}</DataOcurrency>
      </DataOcurrencies>
      <Titulo>Santa Maria</Titulo>
      <Titulo>{data.trust_level}</Titulo>

      <Botao onPress={handleDetails}>
        <BotaoTexto>Detalhes</BotaoTexto>
      </Botao>

    </Card>
  );
}
