import { Component, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { filter, finalize } from 'rxjs/operators';
import { GuardService } from '../../services/guard.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent implements OnInit {
  url: string;

  task: AngularFireUploadTask;

  percentage: Observable<number>;

  snapshot: Observable<any>;

  downloadURL: Observable<string>;

  isHovering: boolean;

  constructor(
    private storage: AngularFireStorage,
    private guard: GuardService
  ) {}

  startUpload(event: FileList) {
    const file = event.item(0);
    // const path = 'test/${new Date().getTime()}_${file.name}' + new Date().getTime() + '_' + file.name;
    const path = 'test/' + new Date().getTime() + '_' + file.name;

    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, file);

    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          this.downloadURL.subscribe(url => (this.url = url));
        })
      )
      .subscribe();
  }

  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  ngOnInit() {
    this.guard.checkRole(2);
  }
}
