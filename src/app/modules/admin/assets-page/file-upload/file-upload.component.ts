import { Component, OnInit } from '@angular/core';
import { WebresourceService } from '../assets.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/modules/core/services/notification.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  files: File[] = [];
  hovering: boolean;
  mode: string = 'selection';

  constructor(private notificationService: NotificationService,
    private webresourceService: WebresourceService,
    private dialogRef: MatDialogRef<FileUploadComponent>) { }

  ngOnInit(): void {
  }


  toggleHover(event: boolean) {
    this.hovering = event;
  }

 onRemove(index: number) {
   this.files.splice(index, 1);
 }

 onFileSelect(event) {
   this.addToUploads(event.srcElement.files);
   (<HTMLInputElement>document.getElementById('fileinput')).value = '';
 }

 onDropFiles(fileList: any) {
   this.addToUploads(fileList);
 }

 addToUploads(fileList: any) {
   const files = [...fileList];
   this.files = this.files.concat(files);
   this.files = this.files.filter((val) => {
     return val.size < 300000;
   });
 }

 onUpload() {

  console.log("onUpload");
  this.mode = 'upload';
  let numUploads = 0;

   for(let i = 0; i < this.files.length; i++) {

    const formData = new FormData();
    formData.append('file', this.files[i]);
    console.log(formData);
    this.webresourceService.addWebresource(formData).subscribe((val)=> {
      numUploads = numUploads + 1;
      if(numUploads == this.files.length) {
        let messg = "Successfully uploaded " + numUploads + " files";
        this.notificationService.info(messg);
      }
    }, (err) => {
      console.log(err);
    });
     /*
     const task = this.uService.uploadFile(this.files[i]);

     this.snapshots[i] = task.snapshotChanges().pipe(
       tap(val => this.tasks[i] = val.task.snapshot),
       finalize(() => {
         numUploads = numUploads + 1;
         if(numUploads == this.files.length) {
           let messg = "Successfully uploaded " + numUploads + " files";
           this.snackService.openSnackBar(messg, "Close");
         }
         
         // this.uService.addToDatabase();
       })
     ).subscribe();
     this.percentages[i] = task.percentageChanges();

     */

      }
   this.mode = "finished";
 }

 selectIcon(type: string) {

  if (type.includes('pdf')) {
    return "insert_drive_file";
  }
  else if(type.includes('image')) {
    return "image";
  }
  else { return "attach_file"; }

}

  onSave() {

  }

  onCancel() {
    this.dialogRef.close();
  }

}
