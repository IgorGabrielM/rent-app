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

  async ngAfterViewInit() {
    this.canvasEl.nativeElement.width = window.innerWidth;
    this.canvasEl.nativeElement.height = 250;

    if (this.canvasEl) {
      this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    } else {
    }
  }

  startDrawing(event: Event) {
  }

  touchUp(event) {
    this.imageBase64Emitter.emit(this.signaturePad.toDataURL());
  }

  moved(event: Event) {
  }

  clearPad() {
    this.signaturePad.clear();
  }
}
