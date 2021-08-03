import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote, QuotePostResponse, QuoteRequest } from 'src/types';

const ENDPOINT = 'http://127.0.0.1:8000/api/quotation';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private bearerToken = '';

  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.init();
  }

  async init() {
    this.bearerToken = 'kjnsfdklgjnsljdngkljnsdflgjnlsndfjs';

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.bearerToken}`,
    });
  }

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(ENDPOINT, { headers: this.headers });
  }

  postQuote(payload: QuoteRequest): Observable<QuotePostResponse> {
    return this.http.post<QuotePostResponse>(ENDPOINT, payload, {
      headers: this.headers,
    });
  }
}
