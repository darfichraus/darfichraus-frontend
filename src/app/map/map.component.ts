import {Component, OnInit, AfterViewInit} from '@angular/core';

import * as L from 'leaflet';
//import statesData from './res/bundeslaender_simplify200.json';

import * as statesData from '../../json-assets/bundeslaender_simplify200.json';

declare var ol: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {


  private map;

  public stateCriticality: number[] = [];

  coronamap: any;
  selectedFeature;
  geojson;
  legend;


  constructor() {
  }


  ngOnInit() {

    /*this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 8
      })
    });
    */

    // const map = L.map('map').setView([51.505, -0.09], 13);
    this.coronamap = L.map('map', {zoomControl: false}).setView([51.27264, 9.26469], 6);


    //var layer = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr, maxZoom: 8, minZoom: 6});

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, maxZoom: 8, minZoom: 6
    }).addTo(this.coronamap);

    console.log(statesData);

    let statesD = {type: statesData.type, crs: statesData.crs, source: statesData.source, features: statesData.features};
    console.log(statesD);
    this.geojson = L.geoJSON(statesD, {
      style: (e) => (this.style(e)),
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetHighlight(e)),
          click: (e) => (this.zoomToFeature(e))
        })
      )
    }).addTo(this.coronamap);


    this.legend = L.control({position: 'bottomright'});

    this.legend.onAdd = function (coronamap) {
      var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 1000, 5000, 10000, 20000],
        labels = [],
        from, to;

      for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        let color= (e) => (this.getColor(from + 1));

        labels.push(
          '<i style="background:' + color /*this.getColor(from + 1)*/ + '"></i> ' +
          from + (to ? '&ndash;' + to : '+'));
      }

      div.innerHTML = labels.join('<br>');
      return div;
    };

    this.legend.addTo(this.coronamap);

  }


  ngAfterViewInit(): void {

  }

  style(feature) {
    let stateCriticality = [1, 20000, 212, 495, 1230, 3322, 8902, 10020, 12555, 222, 12, 0, 1234, 1234, 1234, 1244];

    console.log(feature);
    //if ausgangssperre different border style?

    let d: string;
    let b = stateCriticality[parseInt(feature.properties.RS, 10)];
    if (b > 20000) {
      d = '#800026';
    } else if (b > 10000) {
      d = '#BD0026';
    } else if (b > 5000) {
      d = '#E31A1C';
    } else if (b > 1000) {
      d = '#FC4E2A';
    } else if (b > 50) {
      d = '#FD8D3C';
    } else if (b > 20) {
      d = '#FEB24C';
    } else if (b > 10) {
      d = '#FED976';
    } else {
      d = '#FFEDA0';

    }

    let g = stateCriticality[parseInt(feature.properties.RS, 10)];

    // let color= (g) => this.getColor(g);

    // mouseover: (e) => (this.highlightFeature(e)),
    return {
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: this.getColor(g),
    };

  }

  //geoJSON german states
  // get color depending on population density value
  getColor(d) {
    return d > 20000 ? '#800026' :
      d > 10000 ? '#BD0026' :
        d > 5000 ? '#E31A1C' :
          d > 1000 ? '#FC4E2A' :
            d > 50 ? '#FD8D3C' :
              d > 20 ? '#FEB24C' :
                d > 10 ? '#FED976' :
                  '#FFEDA0';
  }


  getColor2() {

    return '#FFEDA0';
    /*
    if (d === undefined) {
      return '#FFEDA0';
    }
    return d > 20000 ? '#800026' :
        d > 10000  ? '#BD0026' :
        d > 5000  ? '#E31A1C' :
        d > 1000  ? '#FC4E2A' :
        d > 50   ? '#FD8D3C' :
        d > 20   ? '#FEB24C' :
        d > 10   ? '#FED976' :
              '#FFEDA0';
              */
  }

  onEachFeature(feature, layer) {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: this.zoomToFeature
    });
  }


  setOutlinedHighlightedPolygon(layer) {
    layer.setStyle({
      weight: 2,
      color: '#8B0000',
      dashArray: '',
      fillOpacity: 0.7
    });
  }

  setFilledHighlightedPolygon(layer) {
    layer.setStyle({
      weight: 2,
      color: '#8B0000',
      dashArray: '',
      fillOpacity: 5
    });
  }

  highlightFeature(e) {
    var layer = e.target;
    var zoomlevel = this.coronamap.getZoom();

    if (zoomlevel <= 6 || e.target != this.selectedFeature) {
      this.setOutlinedHighlightedPolygon(layer);

    } else {
      this.setFilledHighlightedPolygon(layer);
      console.log(layer.getBounds().getCenter);
      //var label = new L.Label()
      //label.setContent("static label")
      //label.setLatLng(layer.getBounds().getCenter())
      //this.coronamap.showLabel(label);
    }

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
    //info.update(layer.feature.properties);
  }

  resetHighlight(e) {
    var layer = e.target;
    var zoomlevel = this.coronamap.getZoom();
    if (zoomlevel <= 6 || e.target != this.selectedFeature) {
      this.geojson.resetStyle(e.target);
    } else {
      this.setFilledHighlightedPolygon(layer);
    }
    //info.update();
  }

  zoomToFeature(e) {
    this.coronamap.resetStyle;
    if (this.selectedFeature != null) {
      this.setOutlinedHighlightedPolygon(this.selectedFeature);
    }
    this.coronamap.fitBounds(e.target.getBounds());
    this.selectedFeature = e.target;

    this.setFilledHighlightedPolygon(e.target);
  }


}
