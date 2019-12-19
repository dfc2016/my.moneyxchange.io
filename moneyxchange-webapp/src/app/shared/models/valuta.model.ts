export class Valuta {
  readonly name: string;
  readonly symbol: string;

  static of(name: string, symbol: string): Valuta {
    return { name, symbol };
  }
}

export const AVAILABLE_VALUTAS: { [valuta: string]: Valuta } = {
  USD: Valuta.of('USD', '$'),
  EUR: Valuta.of('EUR', '€')
};
