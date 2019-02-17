var firebase = require("firebase"); 
class ABCore {
    generateColor(id) {

    }

    log(key, value) {
        firebase.database().ref(key).set(value);
    }
}
  
export default ABCore;
  
