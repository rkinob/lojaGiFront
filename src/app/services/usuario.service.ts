import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { LoginRequest } from "../models/login-request";
import { BaseService } from "./base.service";

// usuarioService Class
export class UsuarioService extends BaseService {
  private uri = this.urlServiceV1+`Usuario/`;
  constructor(private http: HttpClient) {
    super()
  }

  public verificarUsuario(login: string, senha: string): Observable<LoginRequest> {

    var body = {
            Data: {
                Login: login,
                Senha: senha
            }
        }

   let url = this.uri + "Logar";

    return this.http.post<LoginRequest>(url, body, this.ObterHeaderJson())
        .pipe(
            catchError(this.errorHandler),
            retry(4)
        );
  }

}
