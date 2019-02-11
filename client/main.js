import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session'
import { Markers } from '../imports/api/markers';
import { ReactiveDict } from 'meteor/reactive-dict';
import './main.html';


Meteor.startup(function () {
  GoogleMaps.load({ v: '3', key: 'AIzaSyAXfPpJ9yoNV03vijE6LAxntmiSN-dtxL4', libraries: 'geometry,places' });
  // Markers.remove({});

  console.log("hello")

  Session.set("dataChanged","1")
  // Session.set("mainmodaltimeout",1200)
  

});

Template.body.onRendered(function () {
  let settings = 'pjs-settings-test.json';
  this.autorun(() => {
    let lol = Session.get("test");
    console.log("we just auto ran!!")
    if (particlesJS) {
      console.log(`loading particles.js config from "${settings}"...`)
      /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
      particlesJS.load('particles-js', settings, function () {
        fetch(`${settings}`).then(data => {console.log(data)})
        console.log('callback - particles.js config loaded');
      });
    }
  });
  // $.getJSON(settings, function(data) {
  //   return new Promise((resolves, rejects) => {
  //     data['particles']['shape']['img1'] = 
  //     {
  //       "src": "https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/18118884_105583170010283_3402265634081103440_n.jpg?_nc_cat=102&_nc_ht=scontent.fzty2-1.fna&oh=13a5a347847ebab48d43ba3006df1e69&oe=5CB2EB51",
  //       "width": 100,
  //       "height": 100,
  //     };
  //     // data['particles']['shape']['type'].push('img1');
  //     data['particles']['shape']['type'].push('img1');
  //     Meteor.call("writeJSON", data ,(error,result) => {
  //       console.log(`settings are ${result}`);
  //       resolves(result);
  //     });
  //     // data['particles']['shape']['type'].d
  //     // console.log(data['particles']['shape']);
  //     // fs.writeFile('myjsonfile.json', data, 'utf8', function (){
  //     // resolves(settings);
  //     // console.log(`settings are ${settings}`);
  //     // });
  //   })  
  // }).then(settings => {
  //   console.log(settings);
  //   this.autorun(() => {
  //     if (particlesJS) {
  //       console.log(`loading particles.js config from "${settings}"`)
  //       // window.particlesJS.load = function(tag_id, path_config_json, callback)
  //       particlesJS.load('particles-js', 'pjs-settings-server.json', function () {
  //         console.log('callback - particles.js config loaded');
  //       });
  //     }
  //   });
  // }
  // );
  // for (var i = 0; i < sets.length; i++){
  //   console.log(sets[i]);
  // }


});

Template.body.onCreated(function bodyOnCreated() {

  let settings = 'pjs-settings.json';
  $.getJSON(settings, function(data) {
      data['particles']['shape']['img1'] = 
      {
        "src": "https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/18118884_105583170010283_3402265634081103440_n.jpg?_nc_cat=102&_nc_ht=scontent.fzty2-1.fna&oh=13a5a347847ebab48d43ba3006df1e69&oe=5CB2EB51",
        "width": 100,
        "height": 100,
      };
      console.log("wrote it")
      // data['particles']['shape']['type'].push('img1');
      data['particles']['shape']['type'].push('img1');
      console.log("img1")
      Meteor.call("writeJSON", data ,(error,result) => {
        console.log(result);
      });

  }).then(function () {
    Session.set("test", Session.get("test") + "wow!");
  }
  );
  
});

Template.body.helpers({
  searching(){
    return Session.get("searching") // 0 if in search bar and enter hit
  }
});



function reset_people_var(){
  result = Session.get('peopleJSON');
  console.log(result);
  people = [];
  for (var member_number in result['data']) {
    datum = []
    datum.push(member_number);
    datum.push((result['data'][member_number]['name']));
    datum.push("http://mappy.dali.dartmouth.edu/" + (result['data'][member_number]['iconUrl']));
    datum.push((result['data'][member_number]['message']));
    people.push(datum)
  }
  Session.set('peopleArray', people)
  Session.set('dataChanged', Session.get('dataChanged')+"1")
  console.log(Session.get('dataChanged'));
}

Template.main.onCreated(function helloOnCreated() {
  // counter starts at 0

  this.state = new ReactiveDict();
  Meteor.subscribe('markers');

  // GET LIVE JSON DATA FROM THE DALI WEBSITE
  // STORE THE DATA IN A SESSION VARIABLE "peopleJSON"
  Meteor.call("getJSON", (error, result) => {
    if (error) {
      console.log(error)
    }
    console.log(result);

    for (var member_number in result['data']) {
      result['data'][member_number]['fullIconUrl'] = "http://mappy.dali.dartmouth.edu/" + result['data'][member_number]['iconUrl'];
      result['data'][member_number]['fullUrl'] = "http:" + result['data'][member_number]['url'];
    }

    Session.set('peopleJSON', result)


    people = [];
    for (var member_number in result['data']) {
      datum = []
      datum.push(member_number);
      datum.push((result['data'][member_number]['name']));
      datum.push("http://mappy.dali.dartmouth.edu/" + (result['data'][member_number]['iconUrl']));
      datum.push((result['data'][member_number]['message']));
      people.push(datum)
    }
    Session.set('peopleArray', people)
  });
});

Template.main.helpers({
  counter() {
    return Template.instance().counter.get();
  },

  people() {
    return Session.get('peopleArray');

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

Template.newcarousel.onRendered(function newCarouselOnRendered(){
  this.autorun(() => {
    console.log("we just autoran!!!")
    let test = Session.get("dataChanged")
    setTimeout(function func() {
      let $owl = $('.my-carousel-div');
      $owl.owlCarousel({
        items: 6,
        // autoplay: true,
        autoplayTimeout: 1500,
        autoplayHoverPause: true,
        margin: 10,
        loop: true,
        responsiveClass: true,
        responsive: {
          0: {
            items: 6,
            nav: true
          },
          600: {
            items: 6,
          },
          1000: {
            items: 6,
          }
        }
      });
    }, 0)
  });
});

Template.newcarousel.helpers({
  people() {
    return Session.get("peopleArrayNew")
  }
});

Template.newcarousel.events({
  'click div'(event, instance) {
    console.log("this worked")
    index = event.target.parentElement.id // depends on the HTML in carousel template
    console.log(`index is ${index} with type ${typeof(index)}`);
    Session.set("test", Session.get("test") + "wow!")
    if (index != ""){
      result = Session.get('peopleJSON')['data'][index]
      console.log(result)
      Session.set("person_to_show_modal", result)
      Modal.show('ModalPopup')
    }
  // Session.set("test", Session.get("test") + "wow!");
    
  },
});


Template.carousel.onRendered(function carouselOnRendered() {
  time = 1200;

  console.log("rendered!")
  // this.autorun(() => {
    console.log("we just autoran!!!")
    let test = Session.get("dataChanged")
    setTimeout(function func() {
      let $owl = $('.my-carousel-div');
      $owl.owlCarousel({
        items: 3,
        autoplay: true,
        autoplayTimeout: 1500,
        autoplayHoverPause: true,
        margin: 10,
        loop: true,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            nav: true
          },
          600: {
            items: 3,
          },
          1000: {
            items: 6,
          }
        }
      });
    }, time)
  // });


}
);





Template.carousel.events({
  'click div'(event, instance) {
    index = event.target.parentElement.id // depends on the HTML in carousel template
    console.log(`index is ${index} with type ${typeof(index)}`);
    Session.set("test", Session.get("test") + "wow!")
    if (index != ""){
      result = Session.get('peopleJSON')['data'][index]
      console.log(result)
      Session.set("person_to_show_modal", result)
      Modal.show('ModalPopup')
    }
  Session.set("test", Session.get("test") + "wow!");
    
  },
});

Template.carousel.helpers({
  people() {
    return Session.get('peopleArray');
  }
});

Template.searchbar.events({
  'keyup .searchTerm'(event, instance){
    if (event.which == 13){
      Session.set("peopleArrayNew",[])
      searchedInput = $(".searchTerm").val().toLowerCase();
      console.log(Session.get("peopleArray"))
      peopleArrayNew = []
      result = Session.get("peopleArray")
      for (var i = 0; i < result.length; i++){
        if (result[i][1].toLowerCase() == searchedInput){
          peopleArrayNew.push(result[i])
        }
      }
      if (peopleArrayNew.length!=0){
        Session.set("searching", 1)      
        Session.set("peopleArrayNew",peopleArrayNew)
      }

      // return Session.get('peopleArrayNew');
      // Session.set("peopleArray","")
    }
  },
  'focusout .searchTerm'(event, instance){
    $(".searchTerm").val("");
  },
});

Template.ModalPopup.helpers({
  name() {
    console.log(Session.get("person_to_show_modal"))
    return Session.get("person_to_show_modal")['name']
  },

  image() {
    return Session.get("person_to_show_modal")['fullIconUrl']
  },

  quote() {
    return Session.get("person_to_show_modal")['message']
  },

  site() {
    return Session.get("person_to_show_modal")['fullUrl']
  },

  project() {
    projects = Session.get("person_to_show_modal")['project']
    if (projects[0] == ""){
      console.log("nothing!")
      return 0;
    }
    else{
      if (projects[0] == 'Staff'){
        return "a Staff Member at DALI Lab"
      }
      if (projects.length == 1){
        return `working on the ${projects[0]} project`
      }
      if (projects.length == 2){
        return `working on the ${projects[0]} and the ${projects[1]} project`
      }
    }
  },

  staff(){
    if (Session.get("person_to_show_modal")['project'][0] == "Staff"){
      return 1;
    }
    else{ return 0}
  },

  terms(){
    terms = Session.get("person_to_show_modal")['terms_on']
    return terms.join(' and ')
  },

  mapOptions: function () {
    lati = Session.get("person_to_show_modal")['lat_long'][0]
    longi = Session.get("person_to_show_modal")['lat_long'][1]
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(lati, longi),
        zoom: 9,
        streetViewControl: false,
        rotateControl: false,
        mapTypeControl: false,
        fullscreenControl: false
      };
    }
  },

});

Template.ModalPopup.events({
  'click button.btn-default'(event, instance){
      Session.set("searching",0)
      Session.set("mainmodaltimeout",25) // we want the modal to load faster no need to be safe about reload
  },
  'hide.bs.modal #modalmain'(event, instance){
    console.log("hello")
    Session.set("searching",0)
    Session.set("mainmodaltimeout",25) // we want the modal to load faster no need to be safe about reload
    
},

});

Template.searchedPeople.helpers({
  people(){
    return Session.get("peopleArrayNew");
  }
});

Template.searchedPeople.events({
  'click div'(event, instance){
    index = event.target.parentElement.parentElement.id // depends on the HTML in carousel template
    console.log(`index is ${index} with type ${typeof(index)}`);
    Session.set("test", Session.get("test") + "wow!")
    if (index != ""){
      result = Session.get('peopleJSON')['data'][index]
      console.log(result)
      Session.set("person_to_show_modal", result)
      Modal.show('ModalPopup')
    }
  }
});