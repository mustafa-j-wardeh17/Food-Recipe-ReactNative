import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import { CachedImage } from '../Helper/helper';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

const Categories = ({ category, ActiveCategory, handleChangeCategory }) => {

    return (
        <ScrollView  horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 15, marginTop: 30, gap: 20 }}>
            {
                category.map((item) => {
                    return (
                        <Animated.View entering={FadeInLeft.delay(200).duration(5000).springify().damping(12)} key={item.idCategory} className='gap-1 items-center'>
                            <TouchableOpacity onPress={() => handleChangeCategory(item.strCategory)}
                                className={`${ActiveCategory !== item.strCategory ? 'bg-slate-400' : 'bg-amber-500'} rounded-full items-center justify-center`}
                                style={{ width: wp(20), height: wp(20) }}>
                                <CachedImage
                                    uri= {item.strCategoryThumb }
                                    style={{ width: wp(18), height: wp(18) }}
                                    className='rounded-full z-30'
                                />
                            </TouchableOpacity>
                            <Text className={`${ActiveCategory !== item.strCategory ? 'text-neutral-600' : 'text-black font-bold'}`}>{item.strCategory}</Text>
                        </Animated.View>
                    )
                })
            }
        </ScrollView >
    )
}

export default Categories