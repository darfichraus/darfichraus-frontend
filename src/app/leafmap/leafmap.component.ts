import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-leafmap',
  templateUrl: './leafmap.component.html',
  styleUrls: ['./leafmap.component.scss']
})
export class LeafmapComponent implements OnInit, AfterViewInit {

  private map;
  stateCriticality = [1, 20000, 212, 495, 1230, 3322, 8902, 10020, 12555, 222, 12, 0, 1234, 1234, 1234, 1244];
  stateAllowedToGoOut = [true, true, false, false, false, false, false, true, false, false, false, false, true, false, false, false];
  selectedFeature;
  coronamap;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {

    /*this.map = L.map('map',  {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });
    */

    this.map = L.map('map', {zoomControl: false}).setView([51.27264, 9.26469], 6);


    const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    const mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    const tiles = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr, maxZoom: 8, minZoom: 6});


    /*const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });*/

    tiles.addTo(this.map);

  }

}
