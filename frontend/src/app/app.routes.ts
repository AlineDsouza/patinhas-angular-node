import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './core/components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistoComponent } from './pages/registo/registo.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdoptionFormComponent } from './pages/adoption-form/adoption-form.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DetailsPetComponent } from './pages/details-pet/details-pet.component';
import { ListPetsComponent } from './pages/list-pets/list-pets.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FooterComponent } from './core/components/footer/footer.component';

export const routes: Routes = [
{path:'',component: HomeComponent},
{path:'header',component: HeaderComponent},
{path:'login',component: LoginComponent},
{path:'registo',component: RegistoComponent},
{path:'sobreNos',component: AboutUsComponent},
{path:'admin',component: AdminComponent},
{path:'formulario',component: AdoptionFormComponent},
{path:'contacto',component: ContactComponent},
{path:'detalhes',component: DetailsPetComponent},
{path:'listaPets',component: ListPetsComponent},
{path:'perfil',component: ProfileComponent},
{path:'rodape',component: FooterComponent}

]; //Necessário uma configuração para que possa ser direcionado paras as rotas

