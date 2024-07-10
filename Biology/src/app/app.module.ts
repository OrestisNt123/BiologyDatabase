import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PathwayComponent } from './components/pathway/pathway.component';
import { HeaderComponent } from './components/header/header.component';
import { ProteinComponent } from './components/protein/protein.component';
import { ProteinPathwayComponent } from './components/protein-pathway/protein-pathway.component';
import { GeneProteinComponent } from './components/gene-protein/gene-protein.component';
import { GeneComponent } from './components/gene/gene.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UpdateComponent } from './components/update/update.component';
import { AddComponent } from './components/add/add.component';
import { SearchComponent } from './components/search/search.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    PathwayComponent,
    HeaderComponent,
    ProteinComponent,
    ProteinPathwayComponent,
    GeneProteinComponent,
    GeneComponent,
    DynamicTableComponent,
    LoginComponent,
    RegisterComponent,
    UpdateComponent,
    AddComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
