import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { } from 'google-maps';
import { asap } from 'rxjs/internal/scheduler/asap';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @ViewChild('gmap', { static: true }) gmapElement: any;
  map: google.maps.Map;


  ngAfterContentInit() {
    let mapProp = {
      center: new google.maps.LatLng(41.9100, 12.5518),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    //var types = document.getElementById('type-selector');
    //var strictBounds = document.getElementById('strict-bounds-selector');

    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input as HTMLInputElement);
    autocomplete.bindTo('bounds', this.map);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
      ['address_components', 'geometry', 'icon', 'name']);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var map = this.map;
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
      
      
    });
   
    autocomplete.addListener('place_changed', function () {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);

      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      infowindow.setContent("paga er developer stronzo")
      

      //var address = '';
      //if (place.address_components) {
      //  address = [
      //    (place.address_components[0] && place.address_components[0].short_name || ''),
      //    (place.address_components[1] && place.address_components[1].short_name || ''),
      //    (place.address_components[2] && place.address_components[2].short_name || '')
      //  ].join(' ');
      //}

      //infowindowContent.children['place-icon'].src = place.icon;
      //infowindowContent.children['place-name'].textContent = place.name;
      //infowindowContent.children['place-address'].textContent = "fafaf";
      infowindow.open(this.map, marker);
    });

  }


}
