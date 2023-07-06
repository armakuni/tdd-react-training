import {Sensor} from "./sensor";

const lowPressureThreshold = 17
const highPressureThreshold = 21

export class Alarm {

  private sensor: Sensor
  private alarmOn = false

  constructor(sensor: Sensor) {
    this.sensor = sensor
  }


  check(): void {
    let psiPressureValue = this.sensor.popNextPressurePsiValue()

    if (psiPressureValue < lowPressureThreshold || psiPressureValue > highPressureThreshold) {
      this.alarmOn = true
    }
  }

  isOn() :boolean {
    return this.alarmOn;
  }
}
