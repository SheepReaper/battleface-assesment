import { NgModule } from '@angular/core';
import { RouterModule, Routes, RunGuardsAndResolvers } from '@angular/router';
import { AccessGuard } from './access.guard';
import { ExternalPageComponent } from './external-page/external-page.component';
import { LoginComponent } from './login/login.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { QuotesComponent } from './quotes/quotes.component';
import { environment } from '../environments/environment';

const DOCS_ENDPOINT = `${environment.apiUrl}/documentation`;

const secureRouteProps = <T extends {}>(otherProps?: T) => ({
  data: { requiresLogin: true, ...otherProps },
  canActivate: [AccessGuard],
  runGuardsAndResolvers: 'always' as RunGuardsAndResolvers,
});

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { requiresLogin: false } },
  { path: 'quotes', component: QuotesComponent, ...secureRouteProps() },
  { path: 'newQuote', component: QuoteFormComponent, ...secureRouteProps() },
  {
    path: 'docs',
    component: ExternalPageComponent,
    ...secureRouteProps({ src: DOCS_ENDPOINT }),
  },
  { path: '', redirectTo: 'quotes', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
