package dfc.moneyxchangeapi.exception;

public class ValutaNotSupportedException extends IllegalArgumentException {

  private static final long serialVersionUID = -8235252126038856220L;

  public ValutaNotSupportedException(String message) {
    super(message);
  }
}
