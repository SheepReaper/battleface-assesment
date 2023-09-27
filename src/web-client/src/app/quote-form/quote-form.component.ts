import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuoteRequest, Currency } from 'src/types';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.pug',
  styleUrls: ['./quote-form.component.scss'],
})
export class QuoteFormComponent implements OnInit {
  errors: [string, unknown][] = [];
  isLoading = false;
  myDateForm: UntypedFormGroup;

  currencyList: Currency[] = ['USD', 'EUR', 'GBP'];

  constructor(
    private quoteService: QuoteService,
    private fb: UntypedFormBuilder,
    private router: Router
  ) {
    this.myDateForm = this.fb.group({
      start_date: [new Date(), Validators.required],
      end_date: [new Date(), Validators.required],
      age: ['', Validators.required],
      currency_id: ['USD', Validators.required],
    });
  }

  @Output()
  quoteRequested: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {}

  submitQuote() {
    this.isLoading = true;
    const value: QuoteRequest = this.myDateForm.value;
    this.quoteService
      // .postQuote({ age: "18,20", currency_id: "USD", end_date: new Date(2121, 12, 1).toISOString().slice(0, 10), start_date: new Date(2121, 11, 1).toISOString().slice(0, 10) })
      .postQuote({
        ...value,
        start_date: value.start_date.slice(0, 10),
        end_date: value.end_date.slice(0, 10),
      })
      .subscribe(
        (quote) => {
          this.isLoading = false;
          this.quoteRequested.emit();
          this.router.navigate(['']);
        },
        (error: HttpErrorResponse) => {
          this.errors = Object.entries(error.error['errors']);
          this.isLoading = false;
        }
      );
  }
}
