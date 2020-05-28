import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { SituationCategory } from "src/app/models/situation-category";
import { Webresource } from "src/app/models/webresource";

@Injectable({
  providedIn: "root",
})
export class WebresourceService {
  static readonly WEBRESOURCE_URL_ADMIN =
    environment.apiUrl + "admin/webresources/";
    static readonly WEBRESOURCE_URL =
    environment.apiUrl + "webresources/";

  constructor(private readonly http: HttpClient) {}

  getWebresource() {
    return this.http.get<Webresource[]>(
      WebresourceService.WEBRESOURCE_URL_ADMIN
    );
  }

  deleteWebresource(id: string) {
    return this.http.delete(WebresourceService.WEBRESOURCE_URL_ADMIN + id);
  }

  addWebresource(file: FormData) {
    console.log(file);
    return this.http.post(WebresourceService.WEBRESOURCE_URL_ADMIN, file, {responseType: 'text'});
  }

  getWebresourceById(id: string) {
    return this.http.get<Webresource>(WebresourceService.WEBRESOURCE_URL + id );
  }

  /*updateWebresource(sc: SituationCategory) {
    return this.http.put(WebresourceService.WEBRESOURCE_URL_ADMIN, sc);
  }*/
}
