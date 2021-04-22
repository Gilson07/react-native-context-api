import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import ShoppingCartProvider from './context/shoppingCart';
import Routes from './routes/Stack';

function App() {
    return (
        <NavigationContainer>
            <ShoppingCartProvider>
                <StatusBar barStyle="light-content" backgroundColor="#01070a" />
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <Routes />
                </View>
            </ShoppingCartProvider>
        </NavigationContainer>
    )
};

export default App;