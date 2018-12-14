import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap, GoogleMaps } from '@ionic-native/google-maps/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  providers: [Geolocation]
})
export class MapPage implements OnInit {

  @ViewChild('geoMap') public gmap: ElementRef;

  map: GoogleMap;
  coords: Coordinates;

  constructor(private geo: Geolocation, private platform: Platform) { }

  async ngOnInit() {

    this.map = this.gmap.nativeElement;

    await this.platform.ready().then(() => {
      this.initMap();
    });
  }

  initMap() {
    this.map = GoogleMaps.create(this.map);
  }

  locateMe() {

    this.geo.getCurrentPosition().then(resp => {
      console.log('Latitude: %f \n Longitude %f \n', resp.coords.latitude, resp.coords.longitude);
      this.coords = resp.coords;
      this.map.setCameraTarget({ lat: this.coords.latitude, lng: this.coords.longitude });
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    /* let watchMe = this.geo.watchPosition();
    watchGMap.subscribe(resp => {
      // resp can be a set of coordinates, or an error (if occurre).
     console.log('Latitude: %f \n Longitude %f \n', resp.coords.latitude, resp.coords.longitude);
    }); */

      // Stop watching
      // watchGMap.unsubscribe();
  }

}
