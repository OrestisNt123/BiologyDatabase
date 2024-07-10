import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneComponent } from './components/gene/gene.component';
import { GeneProteinComponent } from './components/gene-protein/gene-protein.component';
import { PathwayComponent } from './components/pathway/pathway.component';
import { ProteinPathwayComponent } from './components/protein-pathway/protein-pathway.component';
import { ProteinComponent } from './components/protein/protein.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateComponent } from './components/update/update.component';
import { AddComponent } from './components/add/add.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'genes', component: GeneComponent, canActivate: [AuthGuard] },
  { path: 'gene-proteins', component: GeneProteinComponent, canActivate: [AuthGuard] },
  { path: 'pathways', component: PathwayComponent, canActivate: [AuthGuard] },
  { path: 'proteins', component: ProteinComponent, canActivate: [AuthGuard] },
  { path: 'protein-pathways', component: ProteinPathwayComponent, canActivate: [AuthGuard] },
  { path: 'update', component: UpdateComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
