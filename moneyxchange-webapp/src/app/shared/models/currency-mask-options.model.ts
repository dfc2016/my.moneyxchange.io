export interface CurrencyMaskOptions {
  prefix?: string;
  suffix?: string;
  includeThousandsSeparator?: boolean;
  thousandsSeparatorSymbol?: string;
  allowDecimal?: boolean;
  decimalSymbol?: string;
  decimalLimit?: number;
  integerLimit?: number;
  requireDecimal?: boolean;
  allowNegative?: boolean;
  allowLeadingZeroes?: boolean;
}
