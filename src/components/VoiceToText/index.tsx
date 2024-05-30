import { useState, useEffect, useCallback, useRef } from 'react';
import Voice, {SpeechRecognizedEvent } from '@react-native-voice/voice';

interface UseVoiceToTextReturn {
  isRecording: boolean;
  result: string;
  startRecording: (onSpeechResultCallback: (result: string) => void) => void;
  stopRecording: () => void;
  toggleRecording: (onSpeechResultCallback: (result: string) => void) => void;
}

const useVoiceToText = (): UseVoiceToTextReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onSpeechResultCallbackRef = useRef<((result: string) => void) | null>(null);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechRecognized = onSpeechRecognized;

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


  const onSpeechStart = useCallback(() => {
    clearTimeoutRef();
  }, [clearTimeoutRef]);

  const onSpeechResults = useCallback((event: any) => {
    clearTimeoutRef();
    const text = event?.value[0];
    setResult(text);
    if (onSpeechResultCallbackRef.current) {
      onSpeechResultCallbackRef.current(text);
    }
    timeoutRef.current = setTimeout(() => {
      stopRecording();
    }, 2000);
  }, [clearTimeoutRef]);

  const onSpeechEnd = useCallback(() => {
    clearTimeoutRef();
    setIsRecording(false);
   
  }, [clearTimeoutRef]);

  const onSpeechError = useCallback((error: any) => {
   
    clearTimeoutRef();
    setIsRecording(false);
    if (error.error === '7' || error.error === '9') { 
      setResult('No speech detected, please try again.');
    } else {
      setResult('An error occurred, please try again.');
    }
  }, [clearTimeoutRef]);

  const onSpeechRecognized = useCallback((event: SpeechRecognizedEvent) => {
    console.log('Speech recognized:::::::', event);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    clearTimeoutRef();
    Voice.stop().catch(error => {
      console.error('Stop Recording Error:', error);
    });
  }, [clearTimeoutRef]);

  const startRecording = useCallback((onSpeechResultCallback: (result: string) => void) => {
    setIsRecording(true);
    setResult('');
    onSpeechResultCallbackRef.current = onSpeechResultCallback;
    Voice.start('en-US').catch(error => {
      onSpeechError(error);
    });
    timeoutRef.current = setTimeout(() => {
      if (isRecording) {
        stopRecording();
      }
    }, 2000);
  }, [onSpeechError, stopRecording, isRecording]);



  const toggleRecording = useCallback((onSpeechResultCallback: (result: string) => void) => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording(onSpeechResultCallback);
    }
  }, [isRecording, startRecording, stopRecording]);

  return {
    isRecording,
    result,
    startRecording,
    stopRecording,
    toggleRecording,
  };
};

export default useVoiceToText;
