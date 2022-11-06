import * as React from 'react'
import {Text, Style, View, Button, Platform} from 'react-native'
import Permissions from 'expo-permissions'
import ImagePicker from 'expo-image-picker'

export default class PickImage extends React.Component{
    state={
        image:null,
    };
render(){
    let {image}= this.state;
return(
<View style={{flex:1,alignItems:"cenetr",justifyContent:"center"}}>
<Button
title="Pick an image fromn camera roll"
onPress={this._pickimage}
/>

</View>
)
}

componenetDidmount(){
    this.getPermissionAsync();
}

getPermissionAsync = async () => {
    if(Platform.OS !== "web"){
        const{status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(status !== "granted"){
            alert("Sorry, we need camera roll permissions to make this work!");
        }

    }
}



uploadImage = async (uri)=> {
const data = new FormData();
let filename = uri.split("/")[uri.split("/").length - 1]
let type = `image/${uri.split('.')[uri.splt('.').length - 1]}`
const fileToUpload = {
uri:uri,
name:filename,
type:type,
};
data.append("digit",fileToUpload);
fetch("https://f292a3137990.ngrok.io/predict-digit",{
    method:"POST",
    body:data,
    headers:{
        "content-type":"multipart/form-data",
    },
})
.then((response)=> response.json())
.then((result)=> {
    console.log("Success:",result);
})
.catch((error) => {
    console.error("Error:",error);

});

};

_pickImage = async()=>{
    try{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1,
        });
        if(!result.cancelled){
            this.setState({image:result.data});
            console.log(result.uri)
            this.uploadImage(resault.uri);
        }


} catch(E){
    console.log(E)
}

};

}
