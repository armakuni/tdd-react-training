import { EnvironmentController, HVAC } from "./hvac";

class fakeHvac implements HVAC {

  temp: number

  public fanState: boolean = false

  public coolerState: boolean = false

  public heaterState: boolean = false

  constructor(temp: number) {
    this.temp = temp;
  }

  getTemperature = () => this.temp
  activateFan = () => this.fanState = true
  activateCooler = () => this.coolerState = true
  activateHeater = () => this.heaterState = true
  deactivateFan = () => this.fanState = false
  deactivateCooler = () => this.coolerState = false
  deactivateHeater = () => this.heaterState = false
  isHeaterOn = () => this.heaterState === true
  isCoolerOn = () => this.coolerState === true
}

describe('Environment Control System', () => {
  it('Given the temperature is 21C then everything should be off on the HVAC', ()=> {

    // given the temperature is 21 c
    const hvac = new fakeHvac(21)
    const controller = new EnvironmentController(hvac)

    // When the system cycle occurs
    controller.tick()

    // then everything should be off
    expect(hvac.fanState).toBeFalsy()
    expect(hvac.heaterState).toBeFalsy()
    expect(hvac.coolerState).toBeFalsy()
  })

  it('Given the temperature is 24C then the fan and cooler should be ON on the HVAC', ()=> {

    // given the temperature is 24 c
    const hvac = new fakeHvac(24)
    const controller = new EnvironmentController(hvac)

    // When the system cycle occurs
    controller.tick()

    // then everything should be off
    expect(hvac.fanState).toBeTruthy()
    expect(hvac.heaterState).toBeFalsy()
    expect(hvac.coolerState).toBeTruthy()
  })

  it('Given that actual temperature is 18ºC, then heater and fan should be on', ()=> {

    // given the temperature is 24 c
    const hvac = new fakeHvac(18)
    const controller = new EnvironmentController(hvac)

    // When the system cycle occurs
    controller.tick()

    // then everything should be off
    expect(hvac.fanState).toBeTruthy()
    expect(hvac.heaterState).toBeTruthy()
    expect(hvac.coolerState).toBeFalsy()
  })

  it('Given the fan and cooler are on and that actual temperature is 22ºC, then everything is off', ()=> {

    // given the temperature is 24 c
    const hvac = new fakeHvac(22)
    hvac.coolerState = true
    hvac.fanState = true

    const controller = new EnvironmentController(hvac)

    // When the system cycle occurs
    controller.tick()

    // then everything should be off
    expect(hvac.fanState).toBeFalsy()
    expect(hvac.heaterState).toBeFalsy()
    expect(hvac.coolerState).toBeFalsy()
  })

  it('Given the fan and heater are on and that actual temperature is 19ºC, then everything only the fan is on', ()=> {

    // given the temperature is 24 c
    const hvac = new fakeHvac(19)
    hvac.heaterState = true
    hvac.fanState = true


    const controller = new EnvironmentController(hvac)

    // When the system cycle occurs
    controller.tick()

    // then everything should be off
    expect(hvac.fanState).toBeTruthy()
    expect(hvac.heaterState).toBeFalsy()
    expect(hvac.coolerState).toBeFalsy()
  })

  it('Given the fan and heater were turned off 4 ticks ago, then the fan is still on', ()=> {
    // given the temperature is 24 c
    const hvac = new fakeHvac(19)
    hvac.heaterState = true
    hvac.fanState = true

    const controller = new EnvironmentController(hvac)
    controller.tick()
    controller.tick()
    controller.tick()
    controller.tick()

    // When the system cycle occurs
    controller.tick()

    // then everything should be off
    expect(hvac.fanState).toBeTruthy()
    expect(hvac.heaterState).toBeFalsy()
    expect(hvac.coolerState).toBeFalsy()
  })

  it('Given the fan and heater were turned off 5 ticks ago, then everything is off', ()=> {

    // given the temperature is 24 c
    const hvac = new fakeHvac(19)
    hvac.heaterState = true
    hvac.fanState = true

    const controller = new EnvironmentController(hvac)

    controller.tick() // Turn off
    controller.tick() // 1 minute
    controller.tick() // 2 minutes
    controller.tick() // 3 minutes
    controller.tick() // 4 minutes

    // When the system cycle occurs
    controller.tick()

    // then everything should be off
    expect(hvac.fanState).toBeFalsy()
    expect(hvac.heaterState).toBeFalsy()
    expect(hvac.coolerState).toBeFalsy()
  })

  it('Given the fan and cooler have been on on and that actual temperature is 23ºC, then only the fan come on', ()=> {

    // given the temperature is 24 c
    const hvac = new fakeHvac(22)
    hvac.coolerState = true
    hvac.fanState = true

    const controller = new EnvironmentController(hvac)

    controller.tick() // Turns off fan and cooler

    hvac.temp = 24

    // When the system cycle occurs
    controller.tick()

    // then everything should be off
    expect(hvac.fanState).toBeTruthy()
    expect(hvac.heaterState).toBeFalsy()
    expect(hvac.coolerState).toBeFalsy()
  })

})
