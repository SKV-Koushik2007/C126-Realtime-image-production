import * as react from 'react';
import PickImage from './screens/Camera';

export default class App extends React.Component {
  render(){
    return <PickImage/>
  
  }
   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

