import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = ({size,className}) => {
  return (
    <View className='flex-1 justify-center items-center'>
      <ActivityIndicator size={size} color={'gray'} />
    </View>
  )
}

export default Loading