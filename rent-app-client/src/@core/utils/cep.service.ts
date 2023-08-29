import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private viaCepUrl = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) { }

  getAddressByCep(cep: string) {
    const cepFormated = cep.replace("-", "");
    return this.http.get(`${this.viaCepUrl}${cepFormated}/json/`);
  }

}
