package dfc.moneyxchangeapi.service;

import java.util.List;

import dfc.moneyxchangeapi.dto.RateDto;

public interface RatesService {

  RateDto getRateFor(String base, List<String> symbols);

}
