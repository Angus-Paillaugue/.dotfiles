import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Sound from 'react-native-sound';
import {Platform} from 'react-native';

// Enable playback in silence mode on iOS
Sound.setCategory('Playback');

const App = () => {
  const [track, setTrack] = useState(null);
  const [status, setStatus] = useState('Stopped');

  const loadSong = () => {
    // Replace with your own file path
    const sound = new Sound(
      'path_to_your_music_file.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        setTrack(sound);
        setStatus('Loaded');
      },
    );
  };

  const playSong = () => {
    if (track) {
      track.play(success => {
        if (success) {
          setStatus('Playing');
        } else {
          console.log('Playback failed due to audio decoding errors');
          setStatus('Stopped');
        }
      });
    }
  };

  const pauseSong = () => {
    if (track && status === 'Playing') {
      track.pause();
      setStatus('Paused');
    }
  };

  const stopSong = () => {
    if (track) {
      track.stop(() => {
        setStatus('Stopped');
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Player</Text>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Load" onPress={loadSong} />
        <Button title="Play" onPress={playSong} />
        <Button title="Pause" onPress={pauseSong} />
        <Button title="Stop" onPress={stopSong} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default App;
