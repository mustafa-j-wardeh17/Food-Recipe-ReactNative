import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline'
import Categories from '../../Components/Categories';
import ListRecipes from '../../Components/ListRecipes';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Progress from 'react-native-progress';

const Home = () => {
    const navigation = useNavigation()
    const [ActiveCategory, SetActiveCategory] = useState('Beef')
    const [categoryData, SetcategoryData] = useState([])
    const [mealData, SetmealData] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [SearchBtn, setSearchBtn] = useState(true)
    const [SearchMeals, SetSearchMeals] = useState([])
    useEffect(() => {
        // fetch data here and set it to the state
        FetchCategory()
        if (searchTerm === '') {
            FetchMeals(ActiveCategory)
        }

    }, [ActiveCategory, SearchMeals])

    const handleChangeCategory = (category) => {
        FetchMeals(category);
        SetActiveCategory(category);
        SetmealData([]);
    }


    const FetchCategory = async () => {
        try {
            const catData = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
            if (catData && catData.data) {
                SetcategoryData(catData.data.categories)
            }
        } catch (error) {
            console.log('error')
        }
    }
    const FetchMeals = async (category = 'Beef') => {
        try {
            const catData = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            if (catData && catData.data) {

                SetmealData(catData.data.meals)

            }
        } catch (error) {
            console.log('error')
        }
    }

    const handleSearch = () => {
        if (searchTerm) {
            // Filter the mealData based on the search term
            const filteredMeals = mealData.filter((item) =>
                item.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Set the filtered results in the state
            SetSearchMeals(filteredMeals);
            setSearchBtn(false)
        } else {
            // If the search term is empty, show all meals
            SetSearchMeals([]);
        }
    };
    const handleSearchSubmit = () => {
        handleSearch();
    };
    const handleClear = () => {
        SetSearchMeals([])
        setSearchTerm('')
        setSearchBtn(true)
    }
    return (
        <View className='flex-1 mt-2'>
            <StatusBar style='dark' />
            <View className='flex flex-row w-full mt-2 h-[75] items-end py-1 px-4'>
                <View className='flex-row justify-between w-full items-center'>
                    <TouchableOpacity className='rounded-full overflow-hidden justify-center' >
                        <Image source={require('./../../../assets/images/avatar.png')} className='rounded-full' style={{ width: wp('10'), height: wp('10') }} />
                    </TouchableOpacity>
                    <TouchableOpacity className='rounded-full overflow-hidden justify-center' >
                        <BellIcon size={30} strokeWidth={1.5} color='gray' />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView className='flex-1 '>
                <Animated.View entering={FadeInDown.duration(500).damping().springify()} className='gap-2 px-4'>
                    <Text className='text-slate-500' style={{ fontSize: wp(4) }}>Hello Mustafa</Text>
                    <Text className='font-[600]' style={{ fontSize: wp('8%') }}>
                        Make your own food,
                    </Text>
                    <Text className='font-[600]' style={{ fontSize: wp('8%') }}>
                        stay at <Text className='text-orange-300'>home</Text>
                    </Text>
                </Animated.View>
                <View className='px-4'>
                    <View className='mt-4 rounded-full w-full bg-neutral-200 flex-row items-center justify-between ' style={{ height: hp(8), paddingLeft: wp(6), paddingRight: wp(1) }}>
                        <TextInput
                            placeholder='Search any recipe'
                            style={{ fontSize: 20, flex: 1 }}
                            value={searchTerm}
                            onChangeText={(text) => setSearchTerm(text)}
                            onSubmitEditing={handleSearchSubmit}
                        />
                        <TouchableOpacity onPress={handleSearch} className={`${SearchBtn ? 'flex' : 'hidden'} bg-white/60 h-full items-center justify-center rounded-full`} style={{ width: hp(6), height: hp(6) }} >
                            <MagnifyingGlassIcon size={26} color='gray' strokeWidth={2} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleClear()}
                            className={`${!SearchBtn ? 'flex' : 'hidden'} bg-white/60 h-full items-center justify-center rounded-full`}
                            style={{ width: hp(6), height: hp(6) }} >
                            <XMarkIcon size={26} color='gray' strokeWidth={2} />
                        </TouchableOpacity>

                    </View>
                </View>
                <View className='mb-3 flex-1  '>
                    <Categories
                        category={categoryData}
                        ActiveCategory={ActiveCategory}
                        handleChangeCategory={handleChangeCategory}
                    />
                    <ListRecipes
                        mealData={SearchMeals.length > 0 ? SearchMeals : mealData}
                        navigation={navigation}
                        categories={categoryData}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default Home