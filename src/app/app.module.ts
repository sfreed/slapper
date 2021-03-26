import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule, DxDataGridModule, DxListModule, DxLookupModule, DxPopupModule, DxTabsModule } from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreenComponent } from './screen/screen.component';
import { FightersComponent } from './fighters/fighters.component';
import { MatchesComponent } from './matches/matches.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ScreenComponent,
    FightersComponent,
    MatchesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxTabsModule,
    DxDataGridModule,
    DxLookupModule,
    DxButtonModule,
    DxPopupModule,
    DxListModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
