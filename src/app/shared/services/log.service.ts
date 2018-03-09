import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Log, LogType } from './../models/log';

@Injectable()
export class LogService {

  private subject = new Subject<Log>();

  constructor() { }

  writeLog(type: LogType, message: string) {
    switch (type) {
      case LogType.Error:
        console.error(message);
        break;
      case LogType.Log:
        console.log(message);
        break;
      case LogType.Warn:
        console.warn(message);
        break;
      default:
        console.error('Type of log invalid');
        break;
    }
  }

  error(message: string) {
    this.writeLog(LogType.Error, message);
  }

  log(message: string) {
    this.writeLog(LogType.Log, message);
  }

  warn(message: string) {
    this.writeLog(LogType.Warn, message);
  }

}
