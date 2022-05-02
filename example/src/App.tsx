import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import RadioPlayer, {
  RadioPlayerEvents,
} from 'react-native-radio-player';

export default function App() {
  const [playerState, setPlayerState] = React.useState<string>('stopped');
  const [channel, setChannel] = React.useState<string>('https://radior.ice.infomaniak.ch/radior-96.aac');
  const [metadata, setMetadata] = React.useState();

  React.useEffect(() => {
    RadioPlayerEvents.addListener('StateDidChange', (eventObject) => {
      setPlayerState(eventObject.state);
    });
    return () => {
      RadioPlayerEvents.removeListener('StateDidChange', (eventObject) => {
        setPlayerState(eventObject.state);
      });
    };
  }, []);

  React.useEffect(() => {
    RadioPlayerEvents.addListener('MetadataDidChange', setMetadata);
    return () => {
      RadioPlayerEvents.addListener('MetadataDidChange', setMetadata);
    };
  }, []);

  React.useEffect(() => {
    RadioPlayer.radioURLWithMetadataSeparator(channel, '-');
    return () => {
      RadioPlayer.play();
    };
  }, [channel]);

  React.useEffect(() => { 
    
   }, []);

  let play = () => {
    RadioPlayer.play();
  };

  let stop = () => {
    RadioPlayer.stop();
  };

  const setLouange = (language: string) => {
    RadioPlayer.stop();
    setChannel('https://radiorlouange.ice.infomaniak.ch/radiorlouange-96.aac')
  }

  const setRadio = (language: string) => {
    RadioPlayer.stop();
    setChannel('https://radior.ice.infomaniak.ch/radior-96.aac')
  }
  const setRadioRap = (language: string) => {
    RadioPlayer.stop();
    setChannel('https://rcommerap.ice.infomaniak.ch/rcommerap-96.aac')
  }

  console.log(metadata);
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Title</Text>
        <Text>{metadata?.trackName ?? 'Unknown'}</Text>
        <Text>Artist</Text>
        <Text>{metadata?.artistName ?? 'Unknown'}</Text>
      </View>
      <View style={[styles.container, styles.actions]}>
        <Button
          title="Play"
          onPress={play}
          disabled={playerState === 'stopped' ? false : true}
        />
        <Button
          title="Stop"
          onPress={stop}
          disabled={playerState === 'stopped' ? true : false}
        />
      </View>
      <View style={[styles.container, styles.actions]}>
        <Button
          title="set Louange"
          onPress={setLouange}
        />
        <Button
          title="Set Radio R"
          onPress={setRadio}
        />        
        <Button
          title="Set Radio Rap"
          onPress={setRadioRap}
        />
      </View>
      <View style={styles.container}>
        <Text>State: {playerState}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
  },
});
