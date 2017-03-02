import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {TimerObservable} from "rxjs/observable/TimerObservable";
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-simple-timer',
  templateUrl: 'simple-timer.html'
})
export class SimpleTimerPage implements OnInit, OnDestroy {

  subscriptionFirst: any;
  subscriptionSecond: any;
  subscriptionThird: any;
  subscriptionFourth: any;
  
  tickFirst: any;
  tickSecond: any;
  tickThird: any;
  tickFourth: any;
  
  remainingSeconds: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
  
  timeInSeconds: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SimpleTimerPage');
  }

  ngOnInit() {
	// Start the timer after 2 seconds
    let firstTimer = TimerObservable.create(2000, 1000);
    this.subscriptionFirst = firstTimer.subscribe(t => {
      this.tickFirst = t;
    });
	
	// Start the timer after 3 seconds
	let secondTimer = TimerObservable.create(3000, 1000);
    this.subscriptionSecond = secondTimer.subscribe(t => {
      this.tickSecond = t;
    });
	
	// Start the timer after 4 seconds
	let thirdTimer = TimerObservable.create(4000, 1000);
    this.subscriptionThird = thirdTimer.subscribe(t => {
      this.tickThird = t;
    });
	
	// Set the inital tick to 0
	this.tickFourth = 0;
	
	this.subscriptionFourth = Observable.interval(1000).subscribe(x => {
		// 1000 implies miliseconds = 1 second
		// Basically run the following code per second
        this.tickFourth++;
	});
	
	setTimeout(() => {
      this.startTimer();
    }, 1000)
	
	
	this.timeInSeconds=60;
	
	this.initTimer();
  }

  ngOnDestroy() {
    this.subscriptionFirst.unsubscribe();
	this.subscriptionSecond.unsubscribe();
	this.subscriptionThird.unsubscribe();
	this.subscriptionFourth.unsubscribe();
  }
 
  setTime(time) {
	  this.timeInSeconds=time;
	
	  this.pauseTimer();
	  this.initTimer();
	  
	  // As startTimer() has the this.timerTick(), which we don't want to call here
	  // otherwise two seconds will change per tick
	  this.runTimer = true;
	  this.hasStarted = true;
  }
  
  initTimer() {
	if(!this.timeInSeconds) { this.timeInSeconds = 0; }

	this.runTimer = false;
	this.hasStarted = false;
	this.hasFinished = false;
	this.remainingSeconds = this.timeInSeconds;
	this.displayTime = this.getSecondsAsDigitalClock(this.remainingSeconds);
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
		this.remainingSeconds--;
		this.displayTime = this.getSecondsAsDigitalClock(this.remainingSeconds);
		if (this.remainingSeconds > 0) {
			this.timerTick();
		}
		else {
			this.hasFinished = true;
		}
	}, 1000);
  }
 
  getSecondsAsDigitalClock(inputSeconds: number) {
	var sec_num = parseInt(inputSeconds.toString(), 10);
	var hours   = Math.floor(sec_num / 3600);
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
