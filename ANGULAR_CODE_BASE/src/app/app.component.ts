import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@sa-environments/environment';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'server-error-modal',
  template: `
    <div>
      <div class="modal-header justify-content-center">
        <h4 class="modal-title" id="modal-basic-title">Alert</h4>
      </div>
      <div class="modal-body">
        <div class="alert alert-warning" role="alert">
          Their seems to be an issue with the server, try <a href="/">reloading</a>.
        </div>
      </div>
    </div>
  `
})
export class ServerDownModal {
  constructor(public activeModal: NgbActiveModal) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private _http: HttpClient,
    private modalService: NgbModal
  ) {
    const url = environment.BASE_URL.split('/api')[0];
    this._http.get(url)
      .subscribe(response => {
      }, (error) => {
        console.log(error)
        if (error.status !== 200) {
          alert('not working')
        }
        this.openErrorModal()
      })
  }

  openErrorModal() {
    this.modalService.open(ServerDownModal)
  }
}
