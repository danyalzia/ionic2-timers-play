import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { SimpleTimerPage } from '../pages/simple-timer/simple-timer';
import { PomodoroTimerPage } from '../pages/pomodoro-timer/pomodoro-timer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	SimpleTimerPage,
	PomodoroTimerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	SimpleTimerPage,
	PomodoroTimerPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
