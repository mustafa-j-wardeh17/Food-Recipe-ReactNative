import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInUp, FadeOut, FadeOutDown, FadeOutUp } from 'react-native-reanimated';
const Welcome = () => {
    const navigation = useNavigation()
    useEffect(() => {
        setTimeout(() => { navigation.navigate('Home') }, 4500)
    }, [])
    return (
        <View className='flex-1 items-center justify-center bg-amber-500'>
            <Animated.View entering={FadeIn.duration(1000).springify().damping(12)} className='bg-white/10 rounded-full mb-8' style={{ padding: wp(8) }}>
                <Animated.View entering={FadeIn.delay(500).duration(500).springify().damping(12)} className='bg-white/10 rounded-full ' style={{ padding: wp(8) }}>
                    <Animated.Image entering={FadeIn.delay(1000).duration(500).springify().damping(12)} source={require('../../../assets/images/welcome.png')} style={{ height: wp('60'), width: wp('60') }} />
                </Animated.View>
            </Animated.View>
            <Animated.View entering={FadeInLeft.delay(1000).duration(1000).damping(12).springify()} className='mt-10 items-center gap-2'>
                <Text className='text-white font-bold' style={{ fontSize: wp(16) }}>Foody</Text>
                <Text className='text-white/95 font-[400]' style={{ fontSize: wp(5) }}>Food is always right</Text>
            </Animated.View>
            {/* <Animated.View
                entering={FadeInLeft.delay(2000).duration(1000).damping(12).springify()}
                style={{ marginTop: hp(8) }}
                className='  rounded-xl  items-center shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] '
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className='bg-amber-400 rounded-xl  w-[150px] h-[60px] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]  items-center justify-center '
                >
                    <Text className='text-center text-white/80 font-bold' style={{ fontSize: wp(6.5) }}>Home</Text>
                </TouchableOpacity>
            </Animated.View> */}

        </View>
    )
}

export default Welcome