import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Stack navigator é navegação em pilha, quando se navega para a próxima tela, a tela anterior
// não deixa de existir, o usuário pode voltar para a mesma

import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';

// Necessário fazer, agora o AppStack funcionará como o roteamento
const AppStack = createStackNavigator();

const Routes = () => {
    return(
        // funcionará como o BrowserRouter, precisa envolver todo o código
        // headerMode="none" remove label home
        <NavigationContainer>
            <AppStack.Navigator 
                headerMode="none" 
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#f0f0f5'
                    }
                }}
            >
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Points" component={Points} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
