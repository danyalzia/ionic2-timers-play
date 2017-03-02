import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-pomodoro-timer',
  templateUrl: 'pomodoro-timer.html'
})
export class PomodoroTimerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PomodoroTimerPage');
  }

  timeInSeconds: number;
  
  time: number;
  remainingTime: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;

  timersArray: any[];
  
  ngOnInit() {
	this.timersArray = [{
		stoppedAt: this.displayTime
	}]
	
    this.initTimer();
  }

  initTimer() {
	// Pomodoro is usually for 25 minutes
    if (!this.timeInSeconds) { this.timeInSeconds = 1500; }

    this.time = this.timeInSeconds;
	this.runTimer = false;
	this.hasStarted = false;
	this.hasFinished = false;
	this.remainingTime = this.timeInSeconds;
    
	this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }

  createNew() {
	  this.timersArray.push({stoppedAt: this.displayTime});
	  
	  this.initTimer();
	  this.pauseTimer();
  }
  
  startTimer() {
	this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }
  
  pauseTimer() {
    this.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {
    setTimeout(() => {

      if (!this.runTimer) { return; }
      this.remainingTime--;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      }
      else {
        this.hasFinished = true;
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }
}
