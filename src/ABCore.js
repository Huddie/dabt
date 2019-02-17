import { normalize } from "path";
import React, { Component } from 'react';

var firebase = require("firebase"); 
class ABCore extends Component{

    constructor(props){
        super(props)
        this.getStyleID = this.getStyleID.bind(this);
        var styles = {
            backgroundColors : [
                'yellow',
                'red',
                'green',
                'blue',
                'black',
                'purple',
                'orange'
            ],

            fontSizes : [
                10,
                20,
                30,
                40,
                50,
                60
            ],

            borderRadiuss : [
                3,
                6,
                9,
                12,
                15,
                18
            ]
        }

        this.state = {
            s : styles
        }
    }
    



    getStyleID = (id) => {
        firebase.database().ref('records').once('value').then(function(snapshot){
            //if database is empty populate it with all options
            console.log(this.state)
            if(snapshot.val() == undefined || snapshot.val() == null){
                for(var color in this.state.s['backgroundColors']){
                    firebase.database().ref(`records/classes/${id}/preferences/backgroundColor/${color}`).set({interactions: 0, views: 1});
                }
                for(var size in this.state.s['fontSizes']){
                    firebase.database().ref(`records/classes/${id}/preferences/fontSize/${size}`).set({interactions: 0, views: 1});
                }
                for(var radius in this.state.s['borderRadiuss']){
                    firebase.database().ref(`records/classes/${id}/preferences/borderRadius/${radius}`).set({interactions: 0, views: 1});
                }
            }

            else{
                //choose a color
                var color_total = 0;
                var size_total = 0;
                var radius_total = 0;
                var selected_color = undefined;
                var selected_size = undefined;
                var selected_radius = undefined;
                var color_probabilities = {};
                var size_probabilities = {};
                var radius_probabilities = {};

                firebase.database.ref(`records/classes/${id}/preferences`).once('value').then(function(snapshot){
                    var backgroundColors = snapshot.val()['backgroundColor']
                    for(var color in backgroundColors){
                        color_probabilities[color] = Math.pow( (backgroundColors[color]['interactions'] + 1.0)  / (backgroundColors[color]['views'] + 1.0) , 2 )
                        color_total += color_probabilities[color]
                    }

                    var fontSizes = snapshot.val()['fontSize']
                    for(var size in fontSizes){
                        size_probabilities[size] = Math.pow( (fontSizes[size]['interactions'] + 1.0)  / (fontSizes[size]['views'] + 1.0) , 2)
                        size_total += size_probabilities[size]
                    }

                    var borderRadiuss = snapshot.val()['borderRadius']
                    for(var radius in borderRadiuss){
                        radius_probabilities[radius] = Math.pow( (borderRadiuss[radius]['interactions'] + 1.0)  / (borderRadiuss[radius]['views'] + 1.0) , 2)
                        radius_total += radius_probabilities[radius]
                    }

                    //Normalize probabilities
                    for(var color in color_probabilities){
                        color_probabilities[color] /= color_total
                    }
                    for(var size in size_probabilities){
                        size_probabilities[size] /= size_total
                    }                    
                    for(var color in color_probabilities){
                        radius_probabilities[radius] /= radius_total
                    }

                    //select values based on probabilities
                    var remaining_probability = 1.0;
                    for(var color in color_probabilities){
                        if(Math.random() < color_probabilities[color] / remaining_probability){
                            selected_color = color;
                            break;
                        }
                        else{
                            remaining_probability -= color_probabilities[color];
                        }
                    }
                    if(selected_color == undefined){
                        selected_color = backgroundColors[0];
                    }

                    remaining_probability = 1.0;
                    for(var size in size_probabilities){
                        if(Math.random() < size_probabilities[size] / remaining_probability){
                            selected_size = size;
                            break;
                        }
                        else{
                            remaining_probability -= size_probabilities[size];
                        }
                    }
                    if(selected_size == undefined){
                        selected_size = fontSizes[0];
                    }

                    remaining_probability = 1.0;
                    for(var radius in radius_probabilities){
                        if(Math.random() < radius_probabilities[radius] / remaining_probability){
                            selected_radius = radius;
                            break;
                        }
                        else{
                            remaining_probability -= radius_probabilities[radius];
                        }
                    }
                    if(selected_radius == undefined){
                        selected_radius = borderRadiuss[0];
                    }

                });
            }
            return {
                color : selected_color,
                size : selected_size,
                radius : selected_radius
            }
        });
        
    }

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
        var path = `records/classes/${id}/preferences/${key}/${value}`
        firebase.database().ref(path).once('value').then(function(snapshot) {
            if(snapshot.val() == undefined || snapshot.val() == null) {
                firebase.database().ref(path).set({interactions: 0, views: 1});
            } else {
                var dict = snapshot.val()
                firebase.database().ref(path).update({views: dict['views']+1});
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
  
