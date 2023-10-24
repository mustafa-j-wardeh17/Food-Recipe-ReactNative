import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeftIcon, BellIcon, HeartIcon, Square3Stack3DIcon, UserIcon } from 'react-native-heroicons/solid'
import { ClockIcon, FireIcon } from 'react-native-heroicons/outline'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Pressable } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import axios from 'axios'
import { CachedImage } from '../../Helper/helper'
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight } from 'react-native-reanimated'
import YoutubeIframe from 'react-native-youtube-iframe'


const RecipeDetail = ({ route, navigation }) => {
    const { Item } = route.params
    const [Fav, SetFav] = useState(false)
    const arr = [1]
    const [MealDetails, SetMealDetails] = useState(null)
    const [Loading, SetLoading] = useState(true)
    useEffect(() => {
        FetchRecipeDetail(Item.idMeal)
    }, [])

    const FetchRecipeDetail = async (id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (response && response.data) {
                SetMealDetails(response.data.meals[0])
                SetLoading(false)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const ingredientsIndexes = (MealDetails) => {
        if (!MealDetails) return [];
        let indexes = [];
        for (let i = 1; i < 20; i++) {
            if (MealDetails['strIngredient' + i]) {
                indexes.push(i)
            }
        }
        return indexes
    }

    const getYoutubeVideoId = url => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    return (
        <View className='flex-1 relative mb-4'>
            <StatusBar style='dark' />
            <Animated.View entering={FadeIn.delay(200).duration(1000)} className='absolute top-0 w-full flex-row h-8 mt-[55px] items-center justify-between z-10'>
                <TouchableOpacity onPress={() => { navigation.goBack() }} className='bg-white p-2 rounded-full ml-2' >
                    <ArrowLeftIcon size={32} color="#fbbf24" strokeWidth={2} />
                </TouchableOpacity>
                <Pressable onPress={() => { SetFav(!Fav) }} className='bg-white p-2 rounded-full mr-2' >
                    <HeartIcon size={32} color={Fav ? "red" : "#fbbf24"} strokeWidth={2} />
                </Pressable>
            </Animated.View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className='items-center mt-1'>
                    <CachedImage
                        sharedTransitionTag={Item.strMeal}
                        uri={Item.strMealThumb}
                        style={{ borderRadius: wp(10), width: wp(99), height: hp(50) }}
                    />
                </View>
                {
                    Loading ?
                        (<ActivityIndicator size={'large'} color={'gray'} style={{ marginTop: hp(20) }} />)
                        :
                        (
                            <>
                                <View className='p-2 mt-8'>
                                    <Animated.View entering={FadeInDown.duration(700).springify().damping(12)}>
                                        <Text className='font-[500] text-[28px]'>{Item.strMeal}</Text>
                                        <Text className='text-neutral-500'> {MealDetails.strArea}</Text>
                                    </Animated.View>
                                    <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className='flex-row justify-center gap-2 mt-1'>
                                        <View className='bg-amber-500 flex-col items-center p-1  rounded-full'>
                                            <View className='rounded-full bg-white p-4 mb-3'>
                                                <ClockIcon size={32} color={'black'} strokeWidth={2} />
                                            </View>
                                            <View className='gap-1 p-2'>
                                                <Text className='text-center font-bold text-[16px]'>35</Text>
                                                <Text className='text-center text-neutral-700 font-bold text-[12px]'>Min</Text>
                                            </View>
                                        </View>
                                        <View className='bg-amber-500 flex-col items-center p-1  rounded-full'>
                                            <View className='rounded-full bg-white p-4 mb-3'>
                                                <UserIcon size={32} color={'black'} strokeWidth={2} />
                                            </View>
                                            <View className='gap-1 p-2'>
                                                <Text className='text-center font-bold text-[16px]'>03</Text>
                                                <Text className='text-center text-neutral-700 font-bold text-[12px]'>Servings</Text>
                                            </View>
                                        </View>
                                        <View className='bg-amber-500 flex-col items-center p-1  rounded-full'>
                                            <View className='rounded-full bg-white p-4 mb-3'>
                                                <FireIcon size={32} color={'black'} strokeWidth={2} />
                                            </View>
                                            <View className='gap-1 p-2'>
                                                <Text className='text-center font-bold text-[16px]'>103</Text>
                                                <Text className='text-center text-neutral-700 font-bold text-[12px]'>Cal</Text>
                                            </View>
                                        </View>
                                        <View className='bg-amber-500 flex-col items-center p-1  rounded-full'>
                                            <View className='rounded-full bg-white p-4 mb-3'>
                                                <Square3Stack3DIcon size={32} color={'black'} strokeWidth={2} />
                                            </View>
                                            <View className='gap-1 p-2'>
                                                <Text className='text-center font-bold text-[16px]'></Text>
                                                <Text className='text-center text-neutral-700 font-bold text-[12px]'>Easy</Text>
                                            </View>
                                        </View>
                                    </Animated.View  >
                                </View>

                                <View className='p-2 flex-1'>
                                    <Text className='font-[600] mt-3' style={{ fontSize: hp(2.6) }} >
                                        Ingredients
                                    </Text>
                                    <Animated.View entering={FadeInLeft.delay(200).duration(700).springify().damping(12)}>
                                        {
                                            ingredientsIndexes(MealDetails).map(i => (
                                                <View key={i} className='mt-3 pl-4 flex-row items-center'>
                                                    <View className='rounded-full w-4 h-4 bg-amber-500 ' />
                                                    <Text
                                                        className='font-bold ml-2'
                                                        style={{ fontSize: hp(1.7) }}
                                                    >
                                                        {MealDetails['strMeasure' + i]}
                                                    </Text>

                                                    <Text
                                                        className='font-200 ml-2'
                                                        style={{ fontSize: hp(1.7) }}
                                                    >
                                                        {MealDetails['strIngredient' + i]}

                                                    </Text>
                                                </View>
                                            ))
                                        }
                                    </Animated.View>
                                </View>

                                {/* instructions */}
                                <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="p-2 flex-1">
                                    <Text style={{ fontSize: hp(2.6) }} className='font-[600] mt-3'>
                                        Instructions
                                    </Text>
                                    <Text style={{ fontSize: hp(1.6) }} className="mt-3 text-neutral-600 flex-row items-center">
                                        {
                                            MealDetails?.strInstructions
                                        }
                                    </Text>
                                </Animated.View>

                                {/* recipe video */}
                                {
                                    MealDetails.strYoutube && (
                                        <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className="p-2 flex-1 space-y-4">
                                            <Text style={{ fontSize: hp(2.6) }} className="font-[600] mt-2">
                                                Recipe Video
                                            </Text>
                                            <View>
                                                <YoutubeIframe
                                                    videoId={getYoutubeVideoId(MealDetails.strYoutube)}
                                                    height={hp(30)}
                                                />
                                            </View>
                                        </Animated.View>
                                    )
                                }
                            </>
                        )
                }
            </ScrollView>
        </View >
    )
}

export default RecipeDetail