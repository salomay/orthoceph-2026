import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {Appbar, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Share from 'react-native-share';

export default class FormCompareResult extends React.Component {
  _onShareReport = async () => {
    const _pdf = this.props.route.params.fileBase64;
    if (_pdf) {
      const shareOptions = {
        title: 'Share file',
        failOnCancel: false,
        mimeType: 'application/pdf',
        saveToFiles: true,
        urls: [this.props.route.params.fileBase64],
        // url: this.props.route.params.fileName,
        // fileName: _pdf.fileName,

        // title: 'Share PDF Report Via',
        // subject: '[OrthoCeph Generated Report]' + _pdf.fileName,
      };
      // console.log(this.state.reportViewer.pdf.file.filePath);

      await Share.open(shareOptions)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    } else {
      Alert.alert('Oops! No file to be shared', 'PDF failed to generate');
    }
  };

  render() {
    const source = {
      uri: this.props.route.params.fileName,
      cache: true,
    };

    return (
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
            borderRadius: 10,
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 5,
            zIndex: 9999,
          }}>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
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
            source={source}
            horizontal={true}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-20%',
  },
  pdf: {
    // flex: 1,
    width: '100%',
    height: '100%',
  },
});
