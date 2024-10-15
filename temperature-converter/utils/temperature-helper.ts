const celsius = "°C";
const fahrenheit = "°F";

type Celsius = {
  value: typeof celsius;
}

type Fahrenheit = {
  value: typeof fahrenheit
}

export type Units = Celsius | Fahrenheit;

export default class TemperatureHelper {
  static convertTemperatureTo(temperature: number, unitTo: Units): number {
    if (unitTo.value === celsius) {
      return (temperature - 32) / 1.8;
    } else if (unitTo.value === fahrenheit) {
      return temperature * 1.8 + 32;
    }

    throw new Error("Invalid temperature!");
  }

  static convertToOppositeUnit(unitTo: Units): Units {
    if (unitTo.value === celsius) {
      return { value: fahrenheit };
    } else if (unitTo.value === fahrenheit) {
      return { value: celsius };
    }

    throw new Error("Invalid unit!");
  }

  static isIceTemperature(temperature: number, unit: Units): boolean {
    if (unit.value === celsius) {
      return temperature <= 0;
    } else if (unit.value === fahrenheit) {
      return temperature <= 32;
    }

    throw new Error("Invalid temperature!");
  }
}