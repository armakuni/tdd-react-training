import {Sensor} from "./sensor";

const lowPressureThreshold = 17
const highPressureThreshold = 21

export class Alarm {

  public sensor = new Sensor();
  alarmOn = false

  check(): void {
    let psiPressureValue = this.sensor.popNextPressurePsiValue()
    console.debug(psiPressureValue.toString())

    if (psiPressureValue < lowPressureThreshold || psiPressureValue > highPressureThreshold) {
      this.alarmOn = true
    }
  }

  isOn() :boolean {
    return this.alarmOn;
  }
}
