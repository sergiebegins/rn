import React, {Component} from 'react';
console.ignoredYellowBox = ['Remote debugger'];
import { View, TouchableOpacity, Text,YellowBox  } from 'react-native';
import { WebView } from 'react-native-webview';
import SocketIOClient from 'socket.io-client/dist/socket.io';
import {
    handleAndroidBackButton,
    exitAlert
} from './modules/androidBackButton';



YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);


export default class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            geri: 'Geri Tuşu',
            ileri: 'ileri Tuşu',
            uri:'http://192.168.0.220/missha/public/',
        }
        this.onPressBackButton= this.onPressBackButton.bind(this);
        this.onPressForwardButton= this.onPressForwardButton.bind(this);

        this.socket = SocketIOClient("http://192.168.0.220:9990");
        this.socket.emit('searchReq',"taksim123");

    }
    componentDidMount() {
        handleAndroidBackButton(exitAlert);
    }


    onPressBackButton() {
        this.webview.goBack();
    }
    onPressForwardButton() {
        this.webview.goForward();
    }
     _onNavigationStateChange(webViewState){

         this.setState({
             uri: "'"+webViewState.url+"'",

         })
    }
    _refWebView = (webview) => {
        this.webview = webview;
    }

    render(){

        return(

            <View  style={{ width: '100%', height: '100%' }}>

                <WebView
                    ref={this._refWebView}
                    automaticallyAdjustContentInsets={false}
                    scalesPageToFit={true}
                    domStorageEnabled={false}
                    allowsInlineMediaPlayback={true}
                    allowFileAccess={true}
                    //  onMessage={m => this.onMessage(m)}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    source = {{ uri:this.state.uri }}
                />
                <View style={{  flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity
                        style={{ alignItems: 'center',
                            backgroundColor: '#DDDDDD',
                            width:'50%',
                            padding: 10}}
                        onPress={this.onPressBackButton}
                    >
                        <Text> geri</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ alignItems: 'center',
                            backgroundColor: '#b0b0b0',
                            width:'50%',
                            padding: 10}}
                        onPress={this.onPressForwardButton}
                    >
                        <Text> ileri </Text>
                    </TouchableOpacity>
                </View>
            </View>


        );
    }
}




//
// export default function App() {
//     this.state = {sampleText: 'Upload Document'};
//
//     const loadstart = () => {
//         this.setState({sampleText: 'Changed Text'});
//     }
//
//   return (
//
//       <View  style={{ width: '100%', height: '100%' }}>
//           <WebView
//               automaticallyAdjustContentInsets={false}
//               originWhitelist={['*']}
//               scalesPageToFit={true}
//               domStorageEnabled={false}
//               allowsInlineMediaPlayback={true}
//               allowFileAccess={true}
//               useWebKit={true}
//               source = {{ uri:'http://192.168.1.10/missha/public/' }}
//           />
//           <Button
//               title={this.state.sampleText}
//               onPress={() => loadstart()}
//           />
//       </View>
//
//   );
//
// }
//



