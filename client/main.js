import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session'
import { Markers } from '../imports/api/markers';
import { ReactiveDict } from 'meteor/reactive-dict';
import { particlesJS } from '../imports/ui/particles';

import './main.html';

Meteor.startup(function() {  
  GoogleMaps.load({ v: '3', key: 'AIzaSyAXfPpJ9yoNV03vijE6LAxntmiSN-dtxL4', libraries: 'geometry,places' });
  // Markers.remove({});


});



Template.main.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);

  this.state=new ReactiveDict();
  Meteor.subscribe('markers');

  // GET LIVE JSON DATA FROM THE DALI WEBSITE
  // STORE THE DATA IN A SESSION VARIABLE "peopleJSON"
  Meteor.call("getJSON" ,(error, result) => {
    if (error){
      console.log(error)
    }
    console.log(result);

    for (var member_number in result['data']){
      result['data'][member_number]['fullIconUrl'] = "http://mappy.dali.dartmouth.edu/"+result['data'][member_number]['iconUrl'];
    }

    Session.set('peopleJSON',result)
    

    people = [];
    for (var member_number in result['data']){
        datum = []
        datum.push(member_number);
        datum.push((result['data'][member_number]['name']));
        datum.push("http://mappy.dali.dartmouth.edu/"+(result['data'][member_number]['iconUrl']));
        datum.push((result['data'][member_number]['message']));
        people.push(datum)
    }
    Session.set('peopleArray',people)
  });
});

Template.main.helpers({
  counter() {
    return Template.instance().counter.get();
  },

  people(){
    return Session.get('peopleArray');

    },
});

Template.main.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    console.log("hello")
    instance.counter.set(instance.counter.get() + 1);
  },
});



// Template.map.helpers({  
//   mapOptions: function() {
//     if (GoogleMaps.loaded()) {
//       return {
//         center: new google.maps.LatLng(10.798042, 35.350880),
//         zoom: 8
//       };
//     }
//   }
// });

// Template.map.onCreated(function() {  
//   GoogleMaps.ready('map', function(map) {
//     // google.maps.event.addListener(map.instance, 'click', function(event) {
//     //   Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
//     // });

//     result = Session.get('peopleJSON');
//     people = [];
//     if (Markers.find().count() != result['data'].length) {
//       for (var member_number in result['data']){
//         lati = result['data'][member_number]['lat_long'][0];
//         longi = result['data'][member_number]['lat_long'][1];
//         Markers.insert({lat: lati, lng: longi})

//     }
//     }


//     var markers = {};

// Markers.find().observe({  
//   added: function(document) {
//     // Create a marker for this document
//     var marker = new google.maps.Marker({
//       draggable: true,
//       animation: google.maps.Animation.DROP,
//       position: new google.maps.LatLng(document.lat, document.lng),
//       map: map.instance,
//       // We store the document _id on the marker in order 
//       // to update the document within the 'dragend' event below.
//       id: document._id
//     });

//     // This listener lets us drag markers on the map and update their corresponding document.
//     google.maps.event.addListener(marker, 'dragend', function(event) {
//       Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
//     });

//     // Store this marker instance within the markers object.
//     markers[document._id] = marker;
//   },
//   changed: function(newDocument, oldDocument) {
//     markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
//   },
//   removed: function(oldDocument) {
//     // Remove the marker from the map
//     markers[oldDocument._id].setMap(null);

//     // Clear the event listener
//     google.maps.event.clearInstanceListeners(
//       markers[oldDocument._id]);

//     // Remove the reference to this marker instance
//     delete markers[oldDocument._id];
//   }
// });

//   });
// });

Template.carousel.onRendered(function mainOnRendered(){
  $('.owl-carousel').owlCarousel({
    items:6,
    autoplay:true,
    autoplayTimeout:1500,
    autoplayHoverPause:true,
    margin:10,
    loop:true,
    responsiveClass:true,
    responsive:{
      0:{
          items:1,
          nav:true
      },
      600:{
          items:3,
      },
      1000:{
          items:6,
      }
  }
  });
});


Template.carousel.helpers({  
  people(){
    return Session.get('peopleArray');
  }
});



Template.carousel.events({
  'click div'(event, instance) {
    // increment the counter when button is clicked
    index = event.target.parentElement.id
    // result = Session.get('peopleArray');
    // Session.set("person_to_show_modal", result[index])
    result = Session.get('peopleJSON')['data'][index]
    console.log(result)
    // console.log(result)
    Session.set("person_to_show_modal", result)
    Modal.show('ModalPopup')
    // instance.counter.set(instance.counter.get() + 1);
  },
});

Template.ModalPopup.helpers({
  name(){
    console.log(Session.get("person_to_show_modal"))
    return Session.get("person_to_show_modal")['name']
  },

  image(){
    return Session.get("person_to_show_modal")['fullIconUrl']
  },

  quote(){
    return Session.get("person_to_show_modal")['message']
  },

  mapOptions: function() {
    lati = Session.get("person_to_show_modal")['lat_long'][0]
    longi = Session.get("person_to_show_modal")['lat_long'][1]
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(lati,longi),
        zoom: 10,
        streetViewControl: false,
        rotateControl: false,
        mapTypeControl: false,
        fullscreenControl: false
      };
    }
  }
});

// Template.body.onRendered(function bodyOnRendered(){
//   particlesJS.load('particles-js', 'assets/particles.json', function() {
//     console.log('callback - particles.js config loaded');
//   });
// });