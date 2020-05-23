import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ZipSearchResponse} from '../../../models/zip-search-response';
import {ChangeDetection} from '@angular/cli/lib/config/schema';
import {HealthInformationByLocationResponse} from '../../../models/health-information-responses';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-advisor-page',
  templateUrl: './lage-page.component.html',
  styleUrls: ['./lage-page.component.scss']
})
export class LagePageComponent implements OnInit, AfterViewInit {

  static readonly PLZ_SEARCH_URL = environment.apiUrl + 'geodata/by-zip-part/';
  static readonly HEALTH_INFO_BY_ZIP = environment.apiUrl + 'health-information/by-zip/';

  inputPlz = '';
  showResult = false;
  cities = [];
  healthInformation: HealthInformationByLocationResponse;
  showInitScreen;

  faExclamationTriangle = faExclamationTriangle;
  doShowMore = false;

  constructor(private httpClient: HttpClient,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.showResult = false;
    this.showInitScreen = false;
  }

  searchPlz() {
    if (this.inputPlz.length !== 5) {
      return;
    }

    this.httpClient.get<ZipSearchResponse>(LagePageComponent.PLZ_SEARCH_URL + this.inputPlz).subscribe(data => {
      this.cities = data.cities;
      this.showResult = true;
    });
  }

  submitAndSave() {
    localStorage.setItem('dir.lookup.plz', this.inputPlz);
    this.showResult = false;
    this.initView();
  }

  loadHealthInformationForPlz(plz: string) {
    this.httpClient.get<HealthInformationByLocationResponse>(LagePageComponent.HEALTH_INFO_BY_ZIP + plz).subscribe(data => {
      this.healthInformation = data;
    });
  }

  ngAfterViewInit(): void {
    this.initView();
  }

  translateCases7ToColor(value) {
    if (value < 25) {
      return 'is-info';
    }

    if (value > 25 && value < 50) {
      return 'is-warning';
    }

    return 'is-error';
  }

  translateCases7ToSeverity(value) {
    if (value < 25) {
      return 'low';
    }

    if (value > 25 && value < 50) {
      return 'mid';
    }

    return 'high';
  }

  showMore() {
    this.doShowMore = !this.doShowMore;
  }

  openModal() {
    this.showResult = true;
  }

  changeLocation() {
    localStorage.removeItem('dir.lookup.plz');
    this.initView();
  }

  initView() {
    setTimeout(() => {
      this.inputPlz = localStorage.getItem('dir.lookup.plz') || '';
      this.showInitScreen = this.inputPlz.length === 0;
      if (this.inputPlz.length === 5) {
        this.loadHealthInformationForPlz(this.inputPlz);
      }
    }, 100);
  }
}
