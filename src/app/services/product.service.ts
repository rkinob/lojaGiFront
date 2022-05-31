import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../product/models/produto';
import { PaginatedList } from '../models/paginated-list';
import { BaseService } from './base.service';
import { BaseResponse } from '../product/models/base-response';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService  {
  private baseURL = this.urlServiceV1 + 'api/Produto';
  private baseURLCat = this.urlServiceV1 + 'api/Categoria';

  constructor(private httpClient: HttpClient) {
    super();
  }

  readAllCategories(): Observable<any> {
    return this.httpClient.get<BaseResponse>(this.baseURLCat + '/ListarCategorias', this.ObterAuthHeaderJson());
  }


  readAll(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(this.baseURL + '/ListarProdutos', this.ObterAuthHeaderJson());
  }

  read(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${id}`, this.ObterAuthHeaderJson());
  }

  create(product: Produto): Observable<any> {
    return this.httpClient.post<Produto>(this.baseURL + '/incluir', JSON.stringify(product), this.ObterAuthHeaderJson())
    .pipe(catchError(this.errorHandler));
  }

  update(product: Produto): Observable<Produto> {
    return this.httpClient.put<Produto>(this.baseURL + '/alterar', JSON.stringify(product), this.ObterAuthHeaderJson());
  }

  delete(id: string): Observable<Produto> {
    return this.httpClient.delete<Produto>(`${this.baseURL}/${id}`, this.ObterAuthHeaderJson());
  }

  searchByName(params: any, name: string): Observable<any> {
    return this.httpClient.get<any>(this.baseURL + '/ListarProdutosPorDescricao/' + name, this.ObterAuthHeaderJson());
  }
}

