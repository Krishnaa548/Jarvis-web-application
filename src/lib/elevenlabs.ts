
// Default voice ID for Jarvis (using "Clyde" from ElevenLabs)
const DEFAULT_VOICE_ID = "2EiwWnXFnvU5JabPnv8n";
const API_KEY = ""; // This would be set by user

// Mock speech synthesis for development until API key is provided
export const playSpeech = async (text: string): Promise<void> => {
  if (!API_KEY) {
    console.log('ElevenLabs API key not set, using browser TTS');
    
    // Fallback to browser's speech synthesis
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Try to find a male voice
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('male') || 
      !voice.name.toLowerCase().includes('female')
    );
    
    if (maleVoice) {
      utterance.voice = maleVoice;
    }
    
    window.speechSynthesis.speak(utterance);
    return;
  }
  
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${DEFAULT_VOICE_ID}/stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    audio.play();
  } catch (error) {
    console.error('Error playing speech:', error);
    // Fallback to browser TTS
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
};

// Function to set API key
export const setElevenLabsApiKey = (apiKey: string): void => {
  localStorage.setItem('elevenLabsApiKey', apiKey);
};

// Function to get API key
export const getElevenLabsApiKey = (): string => {
  return localStorage.getItem('elevenLabsApiKey') || '';
};
