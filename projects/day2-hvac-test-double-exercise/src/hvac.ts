export class EnvironmentController {

  hvac: HVAC;

  fanOffCountdown: number = 0

  coolerCountdown: number = 0

  constructor(hvac: HVAC) {
    this.hvac = hvac
  }

  tick() {
    this.fanOffCountdown--

    if (this.fanOffCountdown == 0) {
      this.hvac.deactivateFan()
    }


    if (this.isTooHot()) {
      this.coolRoom();
    } else if (this.isTooCold()) {
      this.heatRoom();
    } else if (this.isOptimum()) {
      if (this.hvac.isHeaterOn()) {
        this.hvac.deactivateHeater()
        // Start count - set to 5
        this.startFanOffCountdown()
      } else if (this.hvac.isCoolerOn()) {
        this.stopCooling()
      }
    }
  }

  private startFanOffCountdown() {
    this.fanOffCountdown = 5
  }

  private startCoolerCountdown() {
    this.coolerCountdown = 3
  }

  private heatRoom() {
    this.hvac.activateFan()
    this.hvac.activateHeater()
  }

  private coolRoom() {
    this.hvac.activateFan()
    if (this.coolerCountdown <= 0) {
      this.hvac.activateCooler()
    }
  }

  private stopCooling() {
    this.hvac.deactivateCooler()
    this.startCoolerCountdown()
    this.hvac.deactivateFan()
  }

  private isTooCold() {
    return this.hvac.getTemperature() < 19;
  }

  private isTooHot() {
    return this.hvac.getTemperature() > 23;
  }

  private isOptimum() {
    return this.hvac.getTemperature() <= 22 || this.hvac.getTemperature() > 19;
  }
}

export interface HVAC {
  getTemperature: () => number
  activateFan: () => void
  activateCooler: () => void
  activateHeater: () => void
  deactivateFan: () => void
  deactivateCooler: () => void
  deactivateHeater: () => void
  isHeaterOn: () => boolean
  isCoolerOn: () => boolean
}
