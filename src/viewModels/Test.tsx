import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useVoiceToText from 'components/VoiceToText';
import { InputTextField } from 'components';
import Glyphs from 'assets/Glyphs';

const VoiceToText = () => {

const {
    isRecording,
    result,
    startRecording,
    stopRecording,
  }=useVoiceToText();



  return (
    <View style={styles.container}>
      <Text style={styles.text}>{result}</Text>
      <InputTextField onChangeText={function (text: string): void {
              throw new Error('Function not implemented.');
          } } placeholder={'click'} rightIcon={Glyphs.Mic}/>
           <InputTextField onChangeText={function (text: string): void {
              throw new Error('Function not implemented.');
          } } placeholder={'okay'} rightIcon={Glyphs.Mic}/>
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? stopRecording : startRecording}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
});

export default VoiceToText;
