import * as react from 'react';
import { StyleSheet, Text, View, Button,Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class PickImage extends React.Component{
  state = {
    image: null,
  }
  getPermission =async()=>{
      if(Platform.OS != 'web'){
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(status != 'granted'){
            alert('Sorry we need camera roll permissions to make this work')
        }
      }
  }

  componentDidMount() {
    this.getPermission()
  }

  _pickImage =async()=>{
      try{
          let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypesOptions.All,
              allowsEditing: true,
              aspect: [4,3],
              quality: 1
          })
          if(!result.cancelled){
              this.setState({
                  image: result.data
              })
              console.log(result.uri)
              this.uploadImage(result.uri)
          }
      }
      catch(E){
        console.log(E)
      }
  }

  uploadImage =async(uri)=>{
      const data = new FormData()
      let fileName = uri.split('/')[uri.split('/').length - 1]
      let type = `image/${uri.split('.')[uri.split('.')].length - 1}`
      const filetoupload = {
          uri: uri,
          name: fileName,
          type : type
      }
      data.append('digit',filetoupload)
      fetch("https://f292a3137990.ngrok.io/predict-digit", {
        method : 'POST',
        body : data,
        headers: { "content-type": "multipart/form-data"}
      })
      .then((response) => response.json())
      .then((result) => {
          console.log('Success',result)
      })
      .catch((error) => {
        console.error('error',error)
      })
  }

  render(){
      return(
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Button title = 'Pick an Image from Camera Roll' onPress={this._pickImage}>

              </Button>
          </View>
      )
  }
}