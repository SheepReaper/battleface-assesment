import { Component, OnInit } from '@angular/core';
import { Quote } from 'src/types';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.pug',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent implements OnInit {
  quotes: Quote[] = [];
  errorMessage: any;

  isLoading: boolean = true;

  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.getQuotes();
  }

  getQuotes() {
    this.quoteService.getQuotes().subscribe(
      (quotes) => {
        this.quotes = quotes;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
  }
}
