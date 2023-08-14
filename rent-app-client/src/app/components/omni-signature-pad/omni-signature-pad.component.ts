import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'omni-signature-pad',
  templateUrl: './omni-signature-pad.component.html',
  styleUrls: ['./omni-signature-pad.component.scss'],
})
export class OmniSignaturePadComponent implements OnInit, AfterViewInit {
  @Output() imageBase64Emitter = new EventEmitter<string>();

  signaturePad: SignaturePad;
  @ViewChild('canvas') canvasEl: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.canvasEl) {
      this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    } else {
    }
  }

  startDrawing(event: Event) {
  }

  moved(event: Event) {
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    this.imageBase64Emitter.emit(this.signaturePad.toDataURL());
  }

}
