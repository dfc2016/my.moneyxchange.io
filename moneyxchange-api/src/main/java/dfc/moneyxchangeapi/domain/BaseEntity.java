package dfc.moneyxchangeapi.domain;

import java.util.Objects;

public abstract class BaseEntity {

  protected abstract Object getIdentifier();

  @Override
  public boolean equals(Object other) {
    if (this == other) {
      return true;
    }
    if (other == null || getClass() != other.getClass()) {
      return false;
    }
    BaseEntity entity = (BaseEntity) other;
    return Objects.equals(getIdentifier(), entity.getIdentifier());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getIdentifier());
  }

}
