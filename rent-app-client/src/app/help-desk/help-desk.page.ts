import { Component, OnInit } from '@angular/core';
import { TicketModel } from 'src/@core/models/ticket.model';
import { FileSystemImageService } from 'src/@core/services/file-system-image.service';
import { ImageService } from 'src/@core/services/image.service';
import { TicketService } from 'src/@core/services/ticket.service';
import { ToastService } from 'src/@core/utils/toast.service';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.page.html',
  styleUrls: ['./help-desk.page.scss'],
})
export class HelpDeskPage implements OnInit {
  ticket: TicketModel
  imageUrl: string
  image: any
  isUploadingImage: boolean = false

  optionCriticity: { name: string, value: string }[] = [
    {
      name: 'Baixa',
      value: 'low',
    },
    {
      name: 'Media',
      value: 'medium',
    },
    {
      name: 'Alta',
      value: 'high',
    },
  ]

  constructor(
    private imageService: ImageService,
    private ticketService: TicketService,

    private fileSystemImageService: FileSystemImageService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.ticket = new TicketModel()
  }

  async uploadImage() {
    this.isUploadingImage = true
    this.fileSystemImageService.getPhoto().then((image) => {
      fetch(`data:image/png;base64,${image.base64Image}`)
        .then((res) => res.blob())
        .then((blob) => {
          this.imageService.uploadImageBlob(blob, 'tickets').then((res) => {
            this.imageUrl = res
            this.toastService.show('Sucesso', 'Imagem salva com sucesso', {
              color: 'success',
              duration: 2000,
              position: 'top',
            });
            this.isUploadingImage = false
          })
        })
    })
  }

  canSubmit(): boolean {
    if (this.imageUrl && this.ticket.title && this.ticket.description) {
      return true
    } else {
      return false
    }
  }

  onSubmit() {
    this.ticket.image = this.imageUrl
    this.ticketService.create(this.ticket).then(() => {
      this.toastService.show('Sucesso', 'Ticket enviado com sucesso', {
        color: 'success',
        duration: 2000,
        position: 'top',
      });
    })
  }

}
