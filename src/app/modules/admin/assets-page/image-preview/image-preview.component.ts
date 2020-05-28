import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Webresource } from "src/app/models/webresource";
import { WebresourceService } from "../assets.service";

@Component({
  selector: "app-image-preview",
  templateUrl: "./image-preview.component.html",
  styleUrls: ["./image-preview.component.scss"],
})
export class ImagePreviewComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ImagePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Webresource) {}

  ngOnInit(): void {}
}
