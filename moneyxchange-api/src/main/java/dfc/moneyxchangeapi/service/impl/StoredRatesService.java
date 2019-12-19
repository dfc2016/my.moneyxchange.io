package dfc.moneyxchangeapi.service.impl;

import dfc.moneyxchangeapi.domain.Rate;
import dfc.moneyxchangeapi.dto.RateDto;
import dfc.moneyxchangeapi.exception.ValutaNotSupportedException;
import dfc.moneyxchangeapi.repository.RateRepository;
import dfc.moneyxchangeapi.service.RatesService;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public class StoredRatesService implements RatesService {

  private final RateRepository repository;

  public StoredRatesService(RateRepository repository) {
    this.repository = repository;
  }

  @Override
  public RateDto getRateFor(String base, List<String> symbols) {
    Rate baseRate = getBaseRate(base);
    List<Rate> ratesToUsd = getRatesToUsd(symbols);

    return RateDto.builder()
        .date(LocalDate.now())
        .base(base)
        .rates(getRatesToBaseSymbol(baseRate, ratesToUsd))
        .build();
  }

  private Rate getBaseRate(String base) {
    return repository
        .findOneByName(base)
        .orElseThrow(() -> new ValutaNotSupportedException("Base valuta not supported: " + base));
  }

  private List<Rate> getRatesToUsd(List<String> symbols) throws ValutaNotSupportedException {
    List<Rate> ratesToUsd = symbols.stream()
        .map(repository::findOneByName)
        .filter(Optional::isPresent)
        .map(Optional::get)
        .collect(Collectors.toList());

    if (ratesToUsd.isEmpty()) {
      throw new ValutaNotSupportedException("None of these valutas is supported: " + symbols);
    }
    return ratesToUsd;
  }

  private Map<String, Double> getRatesToBaseSymbol(Rate baseRate, List<Rate> ratesToUsd) {
    return ratesToUsd.stream()
        .collect(Collectors.toMap(
            Rate::getName,
            rate -> rate.getUsdRate() / baseRate.getUsdRate()
        ));
  }

}
