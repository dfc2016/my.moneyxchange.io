package dfc.moneyxchangeapi.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RateDto implements Serializable {

  private static final long serialVersionUID = -2055821708175488908L;

  private String base;
  private LocalDate date;
  private Map<String, Double> rates;

}
