import librosa
import numpy as np

def extract_features(file_path):
  y, sr = librosa.load(file_path)
  features = {
      'chroma_stft': np.mean(librosa.feature.chroma_stft(y=y, sr=sr)),
      'rmse': np.mean(librosa.feature.rms(y=y)),
      'spectral_centroid': np.mean(librosa.feature.spectral_centroid(y=y, sr=sr)),
      'spectral_bandwidth': np.mean(librosa.feature.spectral_bandwidth(y=y, sr=sr)),
      'rolloff': np.mean(librosa.feature.spectral_rolloff(y=y, sr=sr)),
      'zero_crossing_rate': np.mean(librosa.feature.zero_crossing_rate(y)),
      'mfcc': np.mean(librosa.feature.mfcc(y=y, sr=sr), axis=1)
  }
  return features

# Example usage
features = extract_features("music/Moment/Desireless - Voyage voyage.mp3")
print(features)
