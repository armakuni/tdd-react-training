import {Alarm} from "./alarm";

describe("Tire Pressure Alarm", () => {
  it('should be off by default', () => {
    let alarm = new Alarm();

    expect(alarm.isOn()).toBeFalsy()
  })
})
