package dfc.moneyxchangeapi.config;

import dfc.moneyxchangeapi.repository.RateRepository;
import dfc.moneyxchangeapi.service.RatesService;
import dfc.moneyxchangeapi.service.impl.StoredRatesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RatesServiceConfig {

  private final RateRepository rateRepository;

  @Autowired
  public RatesServiceConfig(RateRepository rateRepository) {
    this.rateRepository = rateRepository;
  }

  @Bean
  public RatesService ratesService() {
    return new StoredRatesService(rateRepository);
  }

}
