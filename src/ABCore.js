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

    logView(key) {
        firebase.database().ref(key).once('value').then(function(snapshot) {
            if(snapshot.val() == undefined || snapshot.val() == null) {
                firebase.database().ref(key).set({interactions: 0, views: 1});
            } else {
                var dict = snapshot.val()
                firebase.database().ref(key).update({views: dict['views']+1});
            }
        }); 
    }
    logInteraction(key) {
        firebase.database().ref(key).once('value').then(function(snapshot) {
            var dict = snapshot.val()
            firebase.database().ref(key).update({interactions: dict['interactions']+1});
        });
    }
}
  
export default ABCore;
  
