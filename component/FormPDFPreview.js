import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  BackHandler,
  Modal,
  Platform,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {Appbar, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';



export default class FormPdfPreview extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
   this.backHandlerSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
   this.backHandlerSubscription?.remove?.();
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  _onShareReport = async () => {
    const _pdf = this.props.route.params.fileBase64;
    const _fileName = this.props.route.params.fileName;
    console.log(_fileName);
    if (_pdf) {
       const path = `${RNFS.CachesDirectoryPath}/${_fileName}.pdf`;
  await RNFS.writeFile(path, _pdf, 'base64');

  await Share.open({
    url: `file://${path}`,
    type: 'application/pdf',
  });
    }
  };

  

  render() {
    const source = this.props.route.params.fileBase64;
      

   
    return (
      <>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#093545',
          }}>
          <Appbar.Header
            style={{
              // position: 'absolute',
              backgroundColor: '#637363',
                borderRadius: 0,
              justifyContent: 'center',
              alignContent: 'center',
              marginTop: 5,
              zIndex: 9999,
            }}>
            <Appbar.BackAction onPress={() => this.props.navigation.goBack()} color='white' />
            <Appbar.Content
              title="Report Viewer"
              subtitle=""
              titleStyle={{
                fontSize: wp(4),
                fontWeight: 'bold',
                textAlign: 'center',
              }}
              color="white"
            />
            <Appbar.Action
              icon="share-variant-outline"
              onPress={() => this._onShareReport()}
            />
          </Appbar.Header>
          <View style={styles.container}>
           <Pdf
  source={{ uri: `data:application/pdf;base64,${source}`, cache: true }}
  onError={(error) => console.log(error)}
  style={{ flex: 1 }}
/>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flex: 1,
  },
  pdf: {
    // flex: 1,
    width: '100%',
    height: '100%',
  },
});
