import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ThemedText } from '../ThemedText'
import ThemedButton from '../ui/Button/ThemedButton'

interface AuthGuardProps {
    title: string,
    subTitle: string,
    paragraph: string,
}

const AuthGuard = (
    {
        title,
        subTitle,
        paragraph
    } : AuthGuardProps
) => {
  return (
    <View style={{ paddingHorizontal: 16, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 50 }} >
        <View>
            <ThemedText type='defaultSemiBold' fontFamily='poppins' fontSize={24} >
                {title}
            </ThemedText>
        </View>
        <ScrollView
            style={{ height: '100%', width: '100%' }}
        >
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 10, marginTop: 50 }}>
                <ThemedText type='subtitle' fontFamily='poppins' fontSize={16}>
                    {subTitle}
                </ThemedText>
                <ThemedText type='default' fontFamily='poppins' fontSize={12}>
                    {paragraph}
                </ThemedText>            
            </View>
            <ThemedButton title='Log in' onPress={() => console.log('Book Now Pressed')}/>            
        </ScrollView>

    </View>
  )
}

export default AuthGuard;

const styles = StyleSheet.create({})