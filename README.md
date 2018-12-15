# Angular 7, Cordova & Ionic 4 (Beta) Native Geolocation/Google-Maps plugins

[![Dependencies](https://img.shields.io/david/NoLogig/Ionic4_geolocation_google-maps.svg)](https://david-dm.org/NoLogig/Ionic4_geolocation_google-maps) [![License](https://img.shields.io/github/license/NoLogig/Ionic4_geolocation_google-maps.svg)](https://choosealicense.com/licenses/mit/)

|         Prerequisites                                        | Version | Sample   |
|--------------------------------------------------------------|--------:|----|
|  [npm](https://nodejs.org/en/)                               |   6.1.0 | ![Sample](https://github.com/NoLogig/Ionic4_geolocation_google-maps/blob/master/src/assets/ionic4_beta-geo-gmaps.png)    |
|  [Ionic CLI](https://ionicframework.com/getting-started#cli) |   4.5.0 |    |
|  [Angular CLI](https://cli.angular.io/)                      |   7.1.2 |    |

## Create a Ionic app.

```bash
$ ionic start beta-ionic4-geo-gmap sidemenu --cordova --type=angular --no-link
```
It installs dependencies for ionic and sets up the project.

| Command options  | Description                                                 |
|------------------|-------------------------------------------------------------|
| sidemenu         | Create a sidemenu starter template app.                     |
| --cordova	       | Include Cordova integration                                 |
| --no-link   	   | Do not ask to connect the app with the Ionic Dashboard.     |
| --type=angular   | Uses the power of the modern Web,Angular CLI and Angular Router. (*currently beta version!*) |

### Change into app directory

```bash
$ cd beta-ionic4-geo-gmap
```

## Install Cordova and Ionic Native plugins:

### Install Ionic Native plugins: Core, Geolocation & Google-Maps

```bash
$ npm install --save @ionic-native/core@beta 
                     @ionic-native/google-maps@beta 
                     @ionic-native/geolocation@beta
```

### Add plugin: Geolocation

```bash
$ ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate"
```

### Add plugin: Google-Maps

In order to use this plugin, you need to generate API keys at the Google Developers Console.

```bash
$ ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="API_KEY_FOR_ANDROID" 
                                                     --variable API_KEY_FOR_IOS="API_KEY_FOR_IOS"
```

## Use

### Generate Component to display Google-Maps & Geolocation

```bash
$ ionic generate page map

> ng generate page map
CREATE src/app/map/map.module.ts (528 bytes)
CREATE src/app/map/map.page.html (130 bytes)
CREATE src/app/map/map.page.spec.ts (670 bytes)
CREATE src/app/map/map.page.ts (244 bytes)
CREATE src/app/map/map.page.scss (0 bytes)
UPDATE src/app/app-routing.module.ts (684 bytes)
[OK] Generated page!
```

### Create navigation to map page

#### ./src/app/app.component.ts
```ts
export class AppComponent {
  ...
  public appPages = [
    ...
    {
      title: 'Map',
      url: '/map',
      icon: 'map'
    }
  ];
```

### Get Geolocation data & show position in Google-Maps

#### ./src/app/map/map.component.ts
```ts
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

  initMap() { this.map = GoogleMaps.create(this.map); }

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
```

#### ./src/app/map/map.component.html
```html
<ion-header>
  <ion-toolbar>
    <ion-title>map</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content padding color="dark">
  <ion-card class="g-card">
    <div class="gmapstyle" #geoMap></div>

    <ion-card-header color="dark">
      <ion-card-title>IONIC 4 (Beta) / Angular 7 </ion-card-title>
      <ion-card-subtitle>Native Geolocation & Google-Maps (Beta)</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <p>Now that your app has been created, you'll want to start building out features and components. Check out some of the resources below for next steps.</p>
    </ion-card-content>

    <ion-button expand="full" (click)="locateMe()" color="light">Locate Me</ion-button>

  </ion-card>
</ion-content>
```

It's important to set `width` & `height` props for the map. (least 100x100)

#### /src/app/map/map.component.scss
```scss
.g-card ion-img {
    max-height: 35vh;
    overflow: hidden;
}
.gmapstyle {
    width: 100%;
    height: 300px;
}
```

### Before use this demo...
Replace `API KEY` in `config.xml` and `package.json` files with your API keys, to ensure that Google-Maps works.

## Troubleshooting

### `ERROR in node_modules/rxjs/Observable.d.ts(1,15): error TS2307: Cannot find module 'rxjs-compat/Observable'`
```bash
node_modules/rxjs/BehaviorSubject.d.ts(1,15): error TS2307: Cannot find module 'rxjs-compat/BehaviorSubject'.
node_modules/rxjs/Observable.d.ts(1,15): error TS2307: Cannot find module 'rxjs-compat/Observable'.
node_modules/rxjs/Observer.d.ts(1,15): error TS2307: Cannot find module 'rxjs-compat/Observer'.
node_modules/rxjs/ReplaySubject.d.ts(1,15): error TS2307: Cannot find module 'rxjs-compat/ReplaySubject'.
node_modules/rxjs/Rx.d.ts(1,15): error TS2307: Cannot find module 'rxjs-compat'.
node_modules/rxjs/Subject.d.ts(1,15): error TS2307: Cannot find module 'rxjs-compat/Subject'.
node_modules/rxjs/Subscriber.d.ts(1,15): error TS2307: Cannot find module 'rxjs-compat/Subscriber'.
node_modules/rxjs/Subscription.d.ts(1,15): error TS2307: Cannot find module 'rxjs-compat/Subscription'.
node_modules/rxjs/observable/forkJoin.d.ts(1,15): error TS2307: Cannot find module 'rxjs-compat/observable/forkJoin'.
node_modules/rxjs/observable/from.d.ts(1,15): error TS2307: Cannot find module 'rxjs-compat/observable/from'.
node_modules/rxjs/operators/map.d.ts(1,15): error TS2307: Cannot find module 'rxjs-compat/operators/map'.
node_modules/rxjs/operators/startWith.d.ts(1,15): error TS2307: Cannot find module 'rxjs-compat/operators/startWith'.
```

**Solution:** The errors disappeared when update the imports according to the [migration guide](https://github.com/ReactiveX/rxjs/blob/master/docs_app/content/guide/v6/migration.md).

***Note***:
+ rxjs 5 use `import { Observable } from 'rxjs/Observable';`
+ rxjs 6 use `import { Observable } from 'rxjs';`

**Annother approach** is to delete the `node_modules` folder, update `rxjs` to version 6 and/or install `rxjs-compat` 
```bash 
$ npm i --save rxjs@6 rxjs-compat@6
```

And reinstall remaining packages 
```bash 
$ npm install`
```
___

### `ERROR: GET http://localhost:8100/config.xml 404 (Not Found)`

+ zone.js:2969 GET http://localhost:8100/config.xml 404 (Not Found)
+ cordova.js:866 [Browser][cordova.js][xhrStatusChangeHandler] Could not XHR config.xml: Not Found
+ SplashScreenProxy.js:163 [Browser][cordova.js][xhrStatusChangeHandler] Could not XHR config.xml: Not Found

**Solution:** In `node_modules/cordova-browser/cordova-js-src/confighelper.js`

Edit line 68: Remove the slash `/` in the absolute path.
```js 
67    try {
68        xhr.open("get", "/config.xml", true);
69        xhr.send();
70    } 
```
Into: 
```js 
67    try {
68        xhr.open("get", "config.xml", true);
69        xhr.send();
70    } 
```

Let me know, if there is another solution.
___

### `ERROR: DIV is too small. Must be bigger than 100x100.`

**Solution:** Ensure that width and height of google-maps container is set.
___

## Notes

### Install a Plugin
Install the Ionic Native package for each plugin you want to add.
For example, if you want to install the Geolocation plugin, you will need to run the following command:
```bash
$ npm install @ionic-native/geolocation --save
```
Then install the plugin using Cordova or Ionic CLI.
```bash
$ ionic cordova plugin add cordova-plugin-geolocation
```

All package names are documented on the plugin’s documentation. It is recommended to follow the installation instructions on each plugin’s documentation, as some plugins require additional steps to fully install.

### Add Plugins to app Module
After installing a plugin’s package, add it to your app’s NgModule.

```ts
...
import { Geolocation } from '@ionic-native/geolocation/ngx';
...
@NgModule({
  ...
  providers: [
    ...
    Geolocation
    ...
  ]
  ...
})
export class AppModule { }
```

### Use Plugins
```ts
import { Geolocation } from '@ionic-native/geolocation/ngx';
...
public coords: Coordinates;
constructor(private geo: Geolocation) {}
...
this.geo.getCurrentPosition().then(resp => {
 this.coords = resp.coords;
}).catch(error => {
  console.log('Error getting location', error);
});
```

### Ionic Native
Ionic Native is a curated set of community-created wrappers for Cordova plugins that makes adding native functionality to an Ionic app easy. Ionic Native wraps Cordova plugins in a Promise or Observable, providing a common interface for all plugins, and dealing with Angular's change detection.

It is largely a set of community maintained plugins, and while the community is quick to find and fix issues, certain plugins may not function properly. For teams that require dedicated Native plugin support, the Ionic team has options available. Please contact them for more information.

### Usage with Angular 
To use a plugin, import and add the plugin injectable to a @NgModule. For Angular, the import path should end with /ngx.

#### ./src/app/app.module.ts
```ts
import { Geolocation } from '@ionic-native/geolocation/ngx';
...
@NgModule({
  ...
  providers: [
    Geolocation
  ]
})
export class AppModule { }
```

After the plugin has been declared, it can be imported and injected like any other service.

```ts
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';

@Component({ ... })
export class MyComponent {

  constructor(private geolocation: Geolocation, private platform: Platform) {

    platform.ready().then(() => {
      // get position
      geolocation.getCurrentPosition().then(pos => {
        console.log(`lat: ${pos.coords.latitude}, lon: ${pos.coords.longitude}`)
      });
      // watch position
      const watch = geolocation.watchPosition().subscribe(pos => {
        console.log(`lat: ${pos.coords.latitude}, lon: ${pos.coords.longitude}`)
        this.position = pos;
      });
      // to stop watching
      watch.unsubscribe();
    });
  }
}
```
