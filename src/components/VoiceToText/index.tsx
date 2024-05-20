import { useState, useEffect, useCallback, useRef } from 'react';
import Voice, {SpeechErrorEvent } from '@react-native-voice/voice';



interface UseVoiceToTextReturn {
  isRecording: boolean;
  result: string;
  startRecording: () => void;
  stopRecording: () => void;
}

const useVoiceToText = (
): UseVoiceToTextReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechEnd = onSpeechEnd;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const clearTimeoutRef = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);




  const onSpeechResults = useCallback((event: any) => {
    clearTimeoutRef();
    const text = event?.value[0];
    setResult(text);
    timeoutRef.current = setTimeout(() => {
      stopRecording();
    }, 2000); 
  }, [clearTimeoutRef]);

  const onSpeechEnd = useCallback(() => {
    clearTimeoutRef();
    setIsRecording(false);
  }, [clearTimeoutRef]);

  const onSpeechError = useCallback((error: SpeechErrorEvent) => {
    stopRecording();
    clearTimeoutRef();
  }, [clearTimeoutRef]);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    setResult('');
    Voice.start('en-US');
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    clearTimeoutRef();
    Voice.stop();
  }, [clearTimeoutRef]);

  return {
    isRecording,
    result,
    startRecording,
    stopRecording,
  };
};

export default useVoiceToText;
