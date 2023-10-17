import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/home';
import CreateUser from '../pages/CreateUser';
// import DetailsUser from '../pages/DetailsUser';
// import EditUser from '../pages/EditUser';

const AuthStack = createNativeStackNavigator();

function AuthRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
           
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;