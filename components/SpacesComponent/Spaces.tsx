import { restaurantData } from '@/constants/RestaurantData'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import SpaceList from './PopularSpace'

const Spaces = () => {
  return (
    <View>
      <SpaceList title="Popular spaces in Nigeria" data={restaurantData} />
    </View>
  )
}

export default Spaces

const styles = StyleSheet.create({})