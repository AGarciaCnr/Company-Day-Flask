import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NguCarouselModule } from '@ngu/carousel';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutes } from "./home.routing";


import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';


import { HomeOneComponent } from './landing.component';

import { SignUpStudent } from './signupstudent.component';
import { SignUp } from './signup.component';

import { HeaderComponent } from './header/header.component';
import { PresentationComponent } from './presentation/presentation.component';
import { MissionComponent } from './mission/mission.component';
import { ServicesComponent } from './services/services.component';
import { CtaComponent } from './cta/cta.component';
import { FooterComponent } from './footer/footer.component';
import { ActivitiesComponent } from './activities/activities.component';


import { UserPageComponent } from './userpage/userpage.component';

import { SUSComponent } from './pageSUS/pageSUS.component'
import { SUComponent } from './pageSU/pageSU.component'

import { WINDOW_PROVIDERS } from '../../shared/helpers/window.helper';

import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';

import { MatFileUploadModule } from 'angular-material-fileupload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    SharedDirectivesModule,
    SharedComponentsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    NguCarouselModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatFileUploadModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [
    HomeOneComponent,
    SignUpStudent,
    SignUp,
    SUSComponent,
    SUComponent,
    HeaderComponent, 
    PresentationComponent,
    MissionComponent, 
    ServicesComponent, 
    CtaComponent, 
    FooterComponent, 
    ActivitiesComponent, 
    UserPageComponent,
  ],
  providers: [WINDOW_PROVIDERS]

})
export class HomeModule { }
