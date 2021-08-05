import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuotesComponent } from './quotes/quotes.component';
import { LoginComponent } from './login/login.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { DateTransformer } from './http-interceptors/date.transformer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NwbDatePickerModule } from '@wizishop/ng-wizi-bulma';
import { AuthInterceptor } from './http-interceptors/auth';
import { AccessGuard } from './access.guard';
import { ExternalPageComponent } from './external-page/external-page.component';

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    LoginComponent,
    QuoteFormComponent,
    ExternalPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NwbDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AccessGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateTransformer,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
