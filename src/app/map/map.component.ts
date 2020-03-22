import {Component, OnInit, AfterViewInit} from '@angular/core';

import * as L from 'leaflet';
// import statesData from './res/bundeslaender_simplify200.json';

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
  info;
  zoomHome;


  constructor() {
  }


  ngOnInit() {

    // ------ MAP + LAYER -------
    this.coronamap = L.map('map', {zoomControl: false}).setView([51.27264, 9.26469], 6);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, maxZoom: 8, minZoom: 6
    }).addTo(this.coronamap);

    const statesD = {type: statesData.type, crs: statesData.crs, source: statesData.source, features: statesData.features};
    console.log(statesD);
    this.geojson = L.geoJson(statesD, {
      style: (e) => (this.style(e)),
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetHighlight(e)),
          click: (e) => (this.zoomToFeature(e))
        })
      )
    }).addTo(this.coronamap);


    // ---- LEGEND -----
    this.legend = L.control({position: 'bottomright'});


    // let onMyLegend = {
    //   console.log("legend on Add");
    //   const div = L.DomUtil.create('div', 'info legend'),
    //     grades = [0, 10, 20, 50, 1000, 5000, 10000, 20000],
    //     labels = [],
    //     from, to;
    //
    //   for (var i = 0; i < grades.length; i++) {
    //     from = grades[i];
    //     to = grades[i + 1];
    //     // --------- STEFAN ---------
    //     const color = this.getColor(from + 1);
    //
    //     labels.push(
    //       '<i style="background:' + color + '"></i> ' +
    //       from + (to ? '&ndash;' + to : '+'));
    //   }
    //
    //   div.innerHTML = labels.join('<br>');
    //   return div;
    // };

    const legendBuilder = {

      createLegend(vm) {
        return () => {
          let div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 10, 20, 50, 1000, 5000, 10000, 20000],
            labels = [],
            from, to;

          for (let i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];
            const color = vm.getColor(from + 1);

            labels.push(
              '<i style="background:' + color + '"></i> ' +
              from + (to ? '&ndash;' + to : '+'));
          }

          div.innerHTML = labels.join('<br>');
          return div;
        };
      }
    };

    this.legend.onAdd = legendBuilder.createLegend(this);

    this.legend.addTo(this.coronamap);


    // ------ INFO ------
    this.info = L.control();
    // INFO
    this.info.onAdd = function(coronamap) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    this.info.update = function(props) {
      const stateCriticality = [1, 20000, 212, 495, 1230, 3322, 8902, 10020, 12555, 222, 12, 0, 1234, 1234, 1234, 1244];
      this._div.innerHTML = '<h4>Corona Ausgangssperre</h4>' + (props ?
        '<b>' + props.GEN + '</b><br />'
        + stateCriticality[Math.floor(Math.random() * 15)] + ' Menschen infiziert <br />'
        + '<br /> <b>Bevölkerung:</b> ' + props.destatis.population
        + '<br /><br /> <b>Ausgangssperre: <br /></b>21.03.2020 - 15.04.2020'
        : 'Ein Bundesland auswählen');
    };

    this.info.addTo(this.coronamap);


    // ------ BUTTONS ZOOM CONTROL ------
    L.Control.zoomHome = L.Control.extend({
      options: {
        position: 'topleft',
        zoomInText: '+',
        zoomInTitle: 'Zoom in',
        zoomOutText: '-',
        zoomOutTitle: 'Zoom out',
        zoomHomeText: '<i class="fa fa-home" style="line-height:1.65;"></i>',
        zoomHomeTitle: 'Zoom home'
      },

      onAdd(map) {
        const controlName = 'gin-control-zoom',
          container = L.DomUtil.create('div', controlName + ' leaflet-bar'),
          options = this.options;

        this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
          controlName + '-in', container, this._zoomIn);
        this._zoomHomeButton = this._createButton(options.zoomHomeText, options.zoomHomeTitle,
          controlName + '-home', container, this._zoomHome);
        this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
          controlName + '-out', container, this._zoomOut);

        this._updateDisabled();
        map.on('zoomend zoomlevelschange', this._updateDisabled, this);

        return container;
      },

      onRemove(map) {
        map.off('zoomend zoomlevelschange', this._updateDisabled, this);
      },

      _zoomIn(e) {
        this._map.zoomIn(e.shiftKey ? 3 : 1);
      },

      _zoomOut(e) {
        this._map.zoomOut(e.shiftKey ? 3 : 1);
      },

      _zoomHome(e) {
        this.coronamap.setView([51.27264, 9.26469], 6);
      },

      _createButton(html, title, className, container, fn) {
        const link = L.DomUtil.create('a', className, container);
        link.innerHTML = html;
        link.href = '#';
        link.title = title;

        L.DomEvent.on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
          .on(link, 'click', L.DomEvent.stop)
          .on(link, 'click', fn, this)
          .on(link, 'click', this._refocusOnMap, this);

        return link;
      },

      _updateDisabled() {
        const map = this._map,
          className = 'leaflet-disabled';

        L.DomUtil.removeClass(this._zoomInButton, className);
        L.DomUtil.removeClass(this._zoomOutButton, className);

        if (map._zoom === map.getMinZoom()) {
          L.DomUtil.addClass(this._zoomOutButton, className);
        }
        if (map._zoom === map.getMaxZoom()) {
          L.DomUtil.addClass(this._zoomInButton, className);
        }
      }
    });


    this.zoomHome = L.Control.zoomHome();
    this.zoomHome.addTo(this.coronamap);


  }


  ngAfterViewInit(): void {

  }

  style(feature) {
    const stateCriticality = [1, 20000, 212, 495, 1230, 3322, 8902, 10020, 12555, 222, 12, 0, 1234, 1234, 1234, 1244];
    const g: number = stateCriticality[parseInt(feature.properties.RS, 10)];

    console.log(feature);

    return {
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: this.getColor(g),
    };

  }

  // geoJSON german states
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
    const layer = e.target;
    const zoomlevel = this.coronamap.getZoom();

    if (zoomlevel <= 6 || e.target != this.selectedFeature) {
      this.setOutlinedHighlightedPolygon(layer);

    } else {
      this.setFilledHighlightedPolygon(layer);
      console.log(layer.getBounds().getCenter);
      // var label = new L.Label()
      // label.setContent("static label")
      // label.setLatLng(layer.getBounds().getCenter())
      // this.coronamap.showLabel(label);
    }

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
    this.info.update(layer.feature.properties);
  }

  resetHighlight(e) {
    const layer = e.target;
    const zoomlevel = this.coronamap.getZoom();
    if (zoomlevel <= 6 || e.target != this.selectedFeature) {
      this.geojson.resetStyle(e.target);
    } else {
      this.setFilledHighlightedPolygon(layer);
    }
    this.info.update();
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


  // Custom Zoom Control


}
