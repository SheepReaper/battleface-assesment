import { NgModule } from '@angular/core';
import { RouterModule, Routes, RunGuardsAndResolvers } from '@angular/router';
import { AccessGuard } from './access.guard';
import { LoginComponent } from './login/login.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { QuotesComponent } from './quotes/quotes.component';

const secureRouteProps = () => ({
  data: { requiresLogin: true },
  canActivate: [AccessGuard],
  runGuardsAndResolvers: 'always' as RunGuardsAndResolvers,
});

const routes: Routes = [
  { path: 'quotes', component: QuotesComponent, ...secureRouteProps() },
  { path: 'login', component: LoginComponent, data: { requiresLogin: false } },
  { path: 'newQuote', component: QuoteFormComponent, ...secureRouteProps() },
  { path: '', redirectTo: 'quotes', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
