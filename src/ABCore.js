var firebase = require("firebase"); 
class ABCore {
    generateColor(id) {
        var colors = [
            'red',
            'green',
            'blue',
            'black',
            'purple',
            'orange',
            'yellow'
        ]
        return colors[Math.floor(Math.random() * colors.length-1)];
    }

    log(key) {
        firebase.database().ref(key).once('value').then(function(snapshot) {
            if(snapshot.val() == undefined || snapshot.val() == null) {
                firebase.database().ref(key).set({interactions: 1, views: 1});
            }
            var dict = snapshot.val()
            firebase.database().ref(key).set({interactions: dict['interactions']+1, views: dict['views']+1});
        });
    }
}
  
export default ABCore;
  
