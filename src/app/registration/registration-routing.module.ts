import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { RegistrationResolver } from '../core/resolvers/registration.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      registrationResolverOutput: RegistrationResolver,
    },
    component: RegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
