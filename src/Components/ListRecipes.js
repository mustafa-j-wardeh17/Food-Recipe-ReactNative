import { View, Text, TouchableOpacity, Image, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import MasonryList from '@react-native-seoul/masonry-list';
import { CachedImage } from '../Helper/helper';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInUp } from 'react-native-reanimated';
import * as Progress from 'react-native-progress'


const ListRecipes = ({ categories, mealData, navigation }) => {

    return (
        <View className='mt-4 px-4'>
            <Text className='font-[600] text-neutral-700 mb-2' style={{ fontSize: wp(7) }}>Recipes</Text>
                {
                    categories.length == 0 || mealData.length == 0 ? (
                        <View className='justify-center items-center' style={{marginTop:hp(11)}}>
                                {/* <Progress.CircleSnail // or ProgressCircleSnail (depending how you chose to import)
                                    thickness={6}
                                    size={160}
                                    duration={500}
                                    color="#FFBF00"
                                    strokeCap="round"
                                /> */}
                                <ActivityIndicator size={'large'} color={'#FFBF00'} />
                            </View>                       
                    ) : (
                        <MasonryList
                            data={mealData}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <FoodCard item={item} navigation={navigation} index={i} />}
                            onEndReachedThreshold={0.1}
                        />
                    )
                }

        </View>
    )
}

export default ListRecipes


const FoodCard = ({ item, navigation, index }) => {
    const image = item.strMealThumb
    return (
        <Animated.View entering={FadeInUp.delay(200).duration(5000).springify().damping(12)} className='p-2 mb-1'>
            <TouchableOpacity onPress={() => navigation.navigate('RecipeDetail', { Item: item })}>
                <CachedImage
                    sharedTransitionTag={item.strMeal}
                    uri={image}
                    className='rounded-3xl overflow-hidden'
                    style={{ width: '100%', height: index % 3 === 0 ? wp('45%') : wp('60%') }}
                />
            </TouchableOpacity>
            <Text className='text-neutral-700 mt-1 ml-2' style={{ fontSize: wp(4) }}>
                {
                    item.strMeal.length > 18 ? item.strMeal.slice(0, 18) + '...' : item.strMeal
                }
            </Text>
        </Animated.View>
    )
}