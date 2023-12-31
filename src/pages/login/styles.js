import styled from 'styled-components/native';

export const Background = styled.View`
  flex:1;
  background-color: #FFFFFF;
`;

export const Container = styled.KeyboardAvoidingView`
  flex:1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  
  height: 266px;
`;

export const AreaInput = styled.View`
  flex-direction: row;
`;

export const Input = styled.TextInput`
  background-color: #FFF;
  width: 90%;
  font-size: 17px;
  padding: 10px;
  border-radius: 5px;
  color: #121212;
  margin-bottom: 15px;
  border-bottom-color: #00000066;
  border-bottom-width: 1px; 
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 90%;
  height: 45px;
  border-radius: 5px;
  background-color: #68B2F8D9;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  elevation: 5; /* Adicione a propriedade elevation para a sombra */
`;

export const SubmitText = styled.Text`
  font-size: 20px;
  color: #FFF;
`;

export const Link = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: flex-end;
`;

export const LinkText = styled.Text`
  color: #171717;
`;