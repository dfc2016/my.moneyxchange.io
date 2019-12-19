package dfc.moneyxchangeapi.service.impl;

import dfc.moneyxchangeapi.dto.RateDto;
import dfc.moneyxchangeapi.service.RatesService;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.function.Function;
import java.util.stream.Collectors;

public class RandomRatesService implements RatesService {

  @Override
  public RateDto getRateFor(String base, List<String> symbols) {
    return RateDto.builder()
        .base(base)
        .date(LocalDate.now())
        .rates(randomMapOfRates(symbols))
        .build();
  }

  private Map<String, Double> randomMapOfRates(List<String> symbols) {
    Random random = new Random();
    return symbols.stream()
        .collect(Collectors.toMap(Function.identity(), symbol -> random.nextDouble()));
  }

}
