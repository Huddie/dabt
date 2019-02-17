import { normalize } from "path";

var firebase = require("firebase"); 
class ABCore {

    generateColor() {
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

    generateNumber(low, hi) {
        return Math.floor(Math.random() * hi) + low;
    }
    logView(id, key, value) {
        firebase.database().ref(`records/classes/${id}/preferences/${key}/${value}`).once('value').then(function(snapshot) {
            if(snapshot.val() == undefined || snapshot.val() == null) {
                firebase.database().ref(key).set({interactions: 0, views: 1});
                this.normalizeProbs(id, key, value);
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

    normalizeProbs(id, key, value) {

    }
}
  
export default ABCore;
  
