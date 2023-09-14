import { Component, OnInit } from '@angular/core';
import { TicketModel } from 'src/@core/models/ticket.model';
import { FileSystemImageService } from 'src/@core/services/file-system-image.service';
import { ImageService } from 'src/@core/services/image.service';
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
    private fileSystemImageService: FileSystemImageService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.ticket = new TicketModel()
  }

  uploadImage() {
    this.fileSystemImageService.getPhoto().then((image) => {
      console.log(image.base64Image)

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
          })
        })
    })
  }



}
