import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session'
import { Markers } from '../imports/api/markers';
import { ReactiveDict } from 'meteor/reactive-dict';

import './main.html';

Meteor.startup(function() {  
  GoogleMaps.load({ v: '3', key: 'AIzaSyAXfPpJ9yoNV03vijE6LAxntmiSN-dtxL4', libraries: 'geometry,places' });
  // Markers.remove({});
  
});



Template.main.onCreated(function helloOnCreated() {
  // counter starts at 0
  console.log("hello")
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
    Session.set('peopleJSON',result)
  });
});

Template.main.helpers({
  counter() {
    return Template.instance().counter.get();
  },

  people(){
    result = Session.get('peopleJSON');
    people = [];
    for (var member_number in result['data']){
        datum = []
        datum.push((result['data'][member_number]['name']));
        datum.push("http://mappy.dali.dartmouth.edu/"+(result['data'][member_number]['iconUrl']));
        datum.push((result['data'][member_number]['message']));
        people.push(datum)
    }
    return people;

    },
});

Template.main.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    console.log("hello")
    instance.counter.set(instance.counter.get() + 1);
  },
});



Template.map.helpers({  
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(10.798042, 35.350880),
        zoom: 1
      };
    }
  }
});

Template.map.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {
    // google.maps.event.addListener(map.instance, 'click', function(event) {
    //   Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    // });

    result = Session.get('peopleJSON');
    people = [];
    console.log("h" + Markers.find().count());
    console.log(result['data'].length);
    if (Markers.find().count() != result['data'].length) {
      for (var member_number in result['data']){
        lati = result['data'][member_number]['lat_long'][0];
        longi = result['data'][member_number]['lat_long'][1];
        Markers.insert({lat: lati, lng: longi})

    }
    }


    var markers = {};

Markers.find().observe({  
  added: function(document) {
    // Create a marker for this document
    var marker = new google.maps.Marker({
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(document.lat, document.lng),
      map: map.instance,
      // We store the document _id on the marker in order 
      // to update the document within the 'dragend' event below.
      id: document._id
    });

    // This listener lets us drag markers on the map and update their corresponding document.
    google.maps.event.addListener(marker, 'dragend', function(event) {
      Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
    });

    // Store this marker instance within the markers object.
    markers[document._id] = marker;
  },
  changed: function(newDocument, oldDocument) {
    markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
  },
  removed: function(oldDocument) {
    // Remove the marker from the map
    markers[oldDocument._id].setMap(null);

    // Clear the event listener
    google.maps.event.clearInstanceListeners(
      markers[oldDocument._id]);

    // Remove the reference to this marker instance
    delete markers[oldDocument._id];
  }
});

  });
});

Template.carousel.onRendered(function mainOnRendered(){
  $('.owl-carousel').owlCarousel({
    autoplay:true,
    autoplayTimeout:1500,
    autoplayHoverPause:true,
    margin:10,
    loop:true,
  });
});


Template.carousel.helpers({  
  people(){
    result = Session.get('peopleJSON');
    people = [];
    for (var member_number in result['data']){
        datum = []
        datum.push((result['data'][member_number]['name']));
        datum.push("http://mappy.dali.dartmouth.edu/"+(result['data'][member_number]['iconUrl']));
        datum.push((result['data'][member_number]['message']));
        people.push(datum)
    }
    return people;
  }
});