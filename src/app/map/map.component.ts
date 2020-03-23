import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import * as L from 'leaflet';

import * as statesData from '../../json-assets/bundeslaender_simplify200.json';
import {FeedService} from '../feed.service';
import {Areal} from '../_model/areal.enum';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  private static HOME_VIEW = [51.27264, 14.26469];
  mapMode: string;

  @Input('mode') set mode(mode: string) {
    this.mapMode = mode;
    // change color
    if (this.coronamap !== undefined) {

      this.geojson.clearLayers();
      const statesD = {type: statesData.type, crs: statesData.crs, source: statesData.source, features: statesData.features};

      this.geojson = L.geoJson(statesD, {
        style: (e) => (this.style(e)),
        onEachFeature: (feature, layer) => (
          layer.on({
            mouseover: (e) => (this.highlightFeature(e)),
            mouseout: (e) => (this.resetHighlight(e)),
            click: (e) => (this.zoomToFeature(e, feature))
          })
        )
      }).addTo(this.coronamap);

      this.renewLegend();
    }
  }


  private map;

  public stateCriticality: number[] = [];

  coronamap: any;
  selectedFeature;
  geojson;
  legend;
  info;
  zoomHome;


  constructor(private feedService: FeedService) {
  }


  ngOnInit() {
    this.buildMap();
  }

  renewLegend() {
    const legendBuilder = {
      createLegend(vm) {
        return () => {
          let div = L.DomUtil.create('div', 'info legend'),
            grades = ['von heute', 'gestern', 'älter als 2 Tage'],
            labels = [],
            from, to;

          for (let i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];
            const color = vm.getColor(i + 1);

            labels.push(
              '<i style="background:' + color + '"></i> ' +
              from + (to ? '' : ''));
          }
          div.innerHTML = labels.join('<br>');
          return div;
        };
      }
    };
    this.legend.onAdd = legendBuilder.createLegend(this);
    this.legend.addTo(this.coronamap);
  }

  zoomToHomeView() {
    this.coronamap.setView(MapComponent.HOME_VIEW, 6);
    console.log(this.selectedFeature);
    if (this.selectedFeature != null) {
      this.geojson.resetStyle(this.selectedFeature);
    }

    this.feedService.fetchDataForAll();
  }

  buildMap() {

    this.coronamap = L.map('map', {zoomControl: false, scrollWheelZoom: false}).setView(MapComponent.HOME_VIEW, 6);
    this.coronamap.dragging.disable();
    // ------ MAP + LAYER -------
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw&country=de', {
      id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, maxZoom: 8, minZoom: 6
    }).addTo(this.coronamap);

    const statesD = {type: statesData.type, crs: statesData.crs, source: statesData.source, features: statesData.features};

    this.geojson = L.geoJson(statesD, {
      style: (e) => (this.style(e)),
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetHighlight(e)),
          click: (e) => (this.zoomToFeature(e, feature))
        })
      )
    }).addTo(this.coronamap);

    this.legend = L.control({position: 'bottomleft'});

    this.renewLegend();

    // ------ INFO ------
    this.info = L.control();
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
        // + stateCriticality[Math.floor(Math.random() * 15)] + ' Menschen infiziert <br />'
        // + '<br /> <b>Bevölkerung:</b> ' + props.destatis.population
        + '<br /><br /> <b>Ausgangssperre: <br /></b>21.03.2020 - 15.04.2020'
        : 'Ein Bundesland auswählen');
    };

    this.info.addTo(this.coronamap);

  }

  ngAfterViewInit(): void {

  }

  style(feature) {
    const stateCriticality = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1];
    const g: number = stateCriticality[parseInt(feature.properties.RS, 10)];

    return {
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: this.getColor(g),
    };
  }


  getColor(d) {
    return this.getMapColorByModeAndSeverity(this.mapMode, d);
  }

  getMapColorByModeAndSeverity(mode, severity): string {

    switch (mode) {
      case 'bus':
      default:
        switch (severity) {
          case 1:
            return ColorTransportation.STAGE_ONE;
          case 2:
            return ColorTransportation.STAGE_TWO;
          default:
          case 3:
            return ColorTransportation.STAGE_THREE;
        }
      case 'person':
        switch (severity) {
          case 1:
            return ColorEvents.STAGE_ONE;
          case 2:
            return ColorEvents.STAGE_TWO;
          default:
          case 3:
            return ColorEvents.STAGE_THREE;
        }
      case 'restaurant':
        switch (severity) {
          case 1:
            return ColorGastronomy.STAGE_ONE;
          case 2:
            return ColorGastronomy.STAGE_TWO;
          default:
          case 3:
            return ColorGastronomy.STAGE_THREE;
        }
      case 'eco':
        switch (severity) {
          case 1:
            return ColorPublicPlaces.STAGE_ONE;
          case 2:
            return ColorPublicPlaces.STAGE_TWO;
          default:
          case 3:
            return ColorPublicPlaces.STAGE_THREE;
        }
      case 'shopping':
        switch (severity) {
          case 1:
            return ColorRetail.STAGE_ONE;
          case 2:
            return ColorRetail.STAGE_TWO;
          default:
          case 3:
            return ColorRetail.STAGE_THREE;
        }
      case 'close':
        switch (severity) {
          case 1:
            return ColorCurfew.STAGE_ONE;
          case 2:
            return ColorCurfew.STAGE_TWO;
          default:
          case 3:
            return ColorCurfew.STAGE_THREE;
        }
    }

    return '#333333';
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
      weight: 3,
      color: 'white',
      dashArray: '',
      fillOpacity: 0.7
    });
  }

  setFilledHighlightedPolygon(layer) {
    layer.setStyle({
      weight: 3,
      color: 'white',
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

  zoomToFeature(e, info) {
    this.fetchDataForFeature(Areal.STATE, info['properties']['GEN']);
    this.coronamap.resetStyle;
    if (this.selectedFeature != null) {
      this.setOutlinedHighlightedPolygon(this.selectedFeature);
    }
    this.coronamap.fitBounds(e.target.getBounds());
    this.selectedFeature = e.target;

    this.setFilledHighlightedPolygon(e.target);
  }

  fetchDataForFeature(areal: Areal, value: string) {
    this.feedService.fetchDataByAreal(areal, value);
  }

}

enum ColorTransportation {
  STAGE_ONE = '#2E3680',
  STAGE_TWO = '#3A49CB',
  STAGE_THREE = '#5677EC'
}

enum ColorEvents {
  STAGE_ONE = '#6E5BE1',
  STAGE_TWO = '#9382FD',
  STAGE_THREE = '#BFB5FF'
}

enum ColorGastronomy {
  STAGE_ONE = '#2584B4',
  STAGE_TWO = '#3EADE4',
  STAGE_THREE = '#7ED3FD'
}

enum ColorPublicPlaces {
  STAGE_ONE = '#268478',
  STAGE_TWO = '#4BC0B1',
  STAGE_THREE = '#62E0D1'
}

enum ColorRetail {
  STAGE_ONE = '#B4C03F',
  STAGE_TWO = '#D7E54C',
  STAGE_THREE = '#EEF5A3'
}

enum ColorCurfew {
  STAGE_ONE = '#FAC401',
  STAGE_TWO = '#FFD743',
  STAGE_THREE = '#F4DD86'
}
