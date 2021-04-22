import React, { useEffect, useState, useContext } from 'react';
import { View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { ShoppingCartContext } from '../../context/shoppingCart';

import {
    Container,
    Header,
    ButtonGoBack,
    HeaderTitle,
    HeaderRight,
    Products,
    ListingProducts,
    ContainerProducts,
    Name,
    Price,
    ContainerAmount,
    Amount,
    AmountSubtract,
    AmountAdd,
    AmountTitle,
    AmountValue,
    ButtonDelete,
    ContainerResult,
    Result,
    TotalAmount,
    TotalPrice
} from './styles';

function ShoppingCart() {
    const nav = useNavigation();
    const { listProduct, setListProduct } = useContext(ShoppingCartContext);
    const [valuePrice, setValuePrice] = useState(0);
    const [valueAmount, setValueAmount] = useState(0);

    function handleGoBack() {
        nav.goBack();
    }

    function sumCalculates() {
        let sumPrice = 0;
        let sumAmount = 0;
        listProduct.forEach(item => {
            <View key={item.id}>
                {sumPrice = sumPrice + (item.price * item.amount)}
                {sumAmount = sumAmount + item.amount}
            </View>
            setValuePrice(sumPrice);
            setValueAmount(sumAmount);
        });
    }

    function subtractCalculates(item) {
        let sumPrice = valuePrice;
        let sumAmount = valueAmount;
        sumPrice -= (item.price * item.amount);
        sumAmount -= item.amount;
        setValuePrice(sumPrice);
        setValueAmount(sumAmount);
    }

    function sumShopping(item) {
        let sumPrice = valuePrice;
        let sumAmount = valueAmount;
        sumPrice = sumPrice + item.price;
        sumAmount = sumAmount + 1;
        setValuePrice(sumPrice);
        setValueAmount(sumAmount);
    }

    function subtractShopping(item) {
        let sumPrice = valuePrice;
        let sumAmount = valueAmount;
        sumPrice = sumPrice - item.price;
        sumAmount = sumAmount - 1;
        setValuePrice(sumPrice);
        setValueAmount(sumAmount);
    }

    useEffect(() => {
        sumCalculates();
    }, [])

    function handleDeleteProduct(item) {
        const aux = Object.assign([], listProduct);
        const productIndex = aux.findIndex(listProduct => listProduct.id === item.id);
        aux.splice(productIndex, 1);
        setListProduct(aux);
        subtractCalculates(item);
    }

    function incrementAmount(item) {
        sumShopping(item);
        const aux = Object.assign([], listProduct);
        const productIndex = aux.findIndex(listProduct => listProduct.id === item.id);
        aux[productIndex].amount = item.amount + 1;
        setListProduct(aux);
    }

    function decrementAmount(item) {
        if (item.amount > 0) {
            subtractShopping(item);
            const aux = Object.assign([], listProduct);
            const productIndex = aux.findIndex(listProduct => listProduct.id === item.id);
            aux[productIndex].amount = item.amount -1;
            setListProduct(aux);
        }
    }

    return (
        <Container>
            <Header>
                <ButtonGoBack onPress={handleGoBack}>
                    <IoniconsIcon name="arrow-back-outline" size={40} color="black" />
                </ButtonGoBack>
                <HeaderTitle>Sacola</HeaderTitle>
                <HeaderRight />

            </Header>
            <Products>
                {
                    listProduct.map(item => (
                        <>
                            <ListingProducts key={item.id}>
                                <ContainerProducts>
                                    <Name>{item.name}</Name>
                                    <ContainerAmount>
                                        <Amount>
                                            <AmountTitle>Quantidade: </AmountTitle>
                                            <AmountSubtract onPress={() => { decrementAmount(item) }}>
                                                <AntDesignIcon name="minus" size={25} color="black" />
                                            </AmountSubtract>
                                            <AmountValue>{item.amount}</AmountValue>
                                            <AmountAdd onPress={() => { incrementAmount(item) }}>
                                                <AntDesignIcon name="plus" size={20} color="black" />
                                            </AmountAdd>
                                        </Amount>
                                    </ContainerAmount>
                                    <Price>{"R$: " + item.price}</Price>
                                </ContainerProducts>
                                <ButtonDelete onPress={() => handleDeleteProduct(item)}>
                                    <IoniconsIcon name="trash-outline" size={20} color="black" />
                                </ButtonDelete>
                            </ListingProducts>
                        </>
                    ))
                }
            </Products>
            <ContainerResult>
                <Result>
                    <TotalAmount>
                        {"Quantidade: " + valueAmount}
                    </TotalAmount>
                    <TotalPrice>
                        {"Valor: R$" + valuePrice}
                    </TotalPrice>
                </Result>
            </ContainerResult>
        </Container>
    );
}

export default ShoppingCart;