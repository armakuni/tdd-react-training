import {Alarm} from "./alarm";
import {Sensor} from "./sensor";

// const sinon = require("sinon")

describe("Tire Pressure Alarm", () => {
  it('should be off by default', () => {
    const sensor = new Sensor()
    const alarm = new Alarm(sensor);



    expect(alarm.isOn()).toBeFalsy()
  })

  it('given the tire pressure is too low then it should be on', () => {
    const sensor = new Sensor()
    sensor.popNextPressurePsiValue = () => 16

    const alarm = new Alarm(sensor)

    alarm.check()

    expect(alarm.isOn()).toBeTruthy()
  })

  it('given the tire pressure is too high then it should be on', () => {
    const sensor = new Sensor()
    sensor.popNextPressurePsiValue = () => 22

    const alarm = new Alarm(sensor)

    alarm.check()

    expect(alarm.isOn()).toBeTruthy()
  })
})
