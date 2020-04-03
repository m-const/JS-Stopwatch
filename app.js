//An ungodly mess of uncommented vanilla JS ES6 - for learning purposes
//This is a stopwatch, with lap timer and multiple lap sessions

class Stopwatch {
  constructor() {
    this.startTime;
    this.endTime;
    this.isRunning = false;
    this.lapCounter = 1;
    this.totalTime = 0;
    this.timer = null;
  }
  formatTime(ms) {
    if (ms === NaN) return `0:0:0.000`;
    let s = 0;
    let m = 0;
    let h = 0;

    h = Math.floor(ms / 1000 / 60 / 60);
    ms = ms - h * 1000 * 60 * 60;

    m = Math.floor(ms / 1000 / 60);
    ms = ms - m * 1000 * 60;

    s = Math.floor(ms / 1000);

    ms = ms - Math.floor(s * 1000);

    return `${h}:${m}:${s}.${ms}`;
  }
  updateLapTimer() {
    this.clearTimer(this.timer);
    let st = setInterval(() => {
      let ms = new Date().getTime();
      let delta = ms - this.startTime;
      let updateStr = `Lap ${this.lapCounter} | ${this.formatTime(delta)}`;

      document.getElementById(`display`).value = updateStr;
    }, 10);

    return st;
  }
  clearTimer(t) {
    clearInterval(t);
    this.timer = null;
  }
  get startTimer() {
    if (!this.isRunning) {
      this.startTime = new Date().getTime();
      this.isRunning = true;
      this.timer = this.updateLapTimer();

      return this.startTime;
    } else {
      this.errorMsg("Timer is already Running!");
      return;
    }
  }
  errorMsg(msg) {
    //show the error field
    //and set it to the provided msg
    document.getElementById(`error`).style.display = "block";
    document.getElementById(`error`).innerHTML = msg;

    //
    let err = setTimeout(() => {
      document.getElementById(`error`).style.display = "none";
      document.getElementById(`error`).innerHTML = "";
    }, 5000);

    return;
  }
  createLapDisplay(str) {
    let lapEle = document.createElement("p");
    lapEle.innerHTML = str;
    return lapEle;
  }
  get lapTimer() {
    if (this.isRunning) {
      this.endTime = new Date().getTime();
      let diff = this.endTime - this.startTime;
      this.totalTime += diff;
      this.isRunning = false;

      document.getElementById(
        `elapsed`
      ).innerHTML = `Elapsed Time: ${this.formatTime(this.totalTime)}`;
      
      document
        .getElementById(`laps`)
        .insertAdjacentElement(
          "afterbegin",
          this.createLapDisplay(`Lap ${this.lapCounter}: ${this.formatTime(diff)}`)
        );
      this.lapCounter++;
      this.startTimer;
    } else {
      this.errorMsg("Timer is not Running!");
      return;
    }
  }

  get stopTimer() {
    if (this.isRunning) {
      this.endTime = new Date().getTime();
      let diff = this.endTime - this.startTime;
      this.totalTime += diff;
      this.isRunning = false;
      this.clearTimer(this.timer);

      let stopMsg = `Total Time: ${this.formatTime(
        this.totalTime
      )} | Total Laps: ${this.lapCounter}`;
      document.getElementById(`display`).value = "";
      document.getElementById(`elapsed`).innerHTML = "";
      document
        .getElementById(`laps`)
        .insertAdjacentElement(
          "afterbegin",
          this.createLapDisplay(`Lap ${this.lapCounter}: ${this.formatTime(diff)}`)
        );
      document
        .getElementById(`laps`)
        .insertAdjacentElement("afterbegin", this.createLapDisplay(stopMsg));
      this.lapCounter = 1;
      this.isRunning = false;
      this.startTime = null;
      this.endTime = null;
      this.totalTime = 0;
      return;
    } else {
      this.errorMsg("Timer is not Running!");
      return;
    }
  }

  get resetTimer() {
    this.startTime = null;
    this.endTime = null;
    this.isRunning = false;
    this.lapCounter = 1;
    this.totalTime = 0;
    this.clearTimer(this.timer);
    document.getElementById(`display`).value = "Timer Reset!";
    document.getElementById(`laps`).innerHTML = "";
    document.getElementById(`elapsed`).innerHTML = "";
    return;
  }

  
}
const sw = new Stopwatch();

document.getElementById("start").addEventListener("click", () => {
  sw.startTimer;
});
document.getElementById("stop").addEventListener("click", () => {
  sw.stopTimer;
});
document.getElementById("lap").addEventListener("click", () => {
  sw.lapTimer;
});
document.getElementById("reset").addEventListener("click", () => {
  sw.resetTimer;
});
