package dfc.moneyxchangeapi.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
public class Rate extends BaseEntity {

  @Id
  private String name;

  private Double usdRate;

  @Override
  protected Object getIdentifier() {
    return getName();
  }
}
