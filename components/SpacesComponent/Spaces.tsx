import { NextMonthSpaceData } from '@/constants/NextMonthSpaces'
import { PopularSpaceData } from '@/constants/RestaurantData'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import NextMonthSpaceList from './NextMonthSpace'
import SpaceList from './PopularSpace'

const Spaces = () => {
  return (
    <View style={ styles.container } >
      <SpaceList title="Popular spaces in Nigeria" data={PopularSpaceData} />
      <NextMonthSpaceList title="Avaliable next month in Nigeria" data={NextMonthSpaceData} />
      <SpaceList title="Nearby spaces to you" data={PopularSpaceData} />
    </View>
  )
}

export default Spaces

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16
  }
})