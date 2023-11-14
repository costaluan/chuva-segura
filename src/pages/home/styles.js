import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: #FFF;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  height: 125px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #68B2F8;
  padding-top: 6%;
  margin-bottom: 8%;
`;

export const Warning = styled.Text`
  font-size: 36px;
  color: #000;
`;

export const Button = styled.TouchableOpacity`
  background-color: transparent;
  width: 90%;
  height: 45px;
  font-size: 24px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  margin-top: 8x;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const ButtonNewOcurrency = styled.TouchableOpacity`
  border-color: #FFF;
  border-width: 1px; 
  margin-right: 8%; 
  width: 40%; 
  height: 30%; 
  align-self: flex-end; 
  margin-bottom: 2px; 
  margin-top: 2px;
  padding-top: 4px;
  border-radius: 4px;
`;
