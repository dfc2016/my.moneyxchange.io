package dfc.moneyxchangeapi.controller;

import dfc.moneyxchangeapi.constant.Resource;
import dfc.moneyxchangeapi.dto.RateDto;
import dfc.moneyxchangeapi.service.RatesService;

import java.util.List;
import javax.validation.constraints.NotEmpty;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequestMapping(Resource.RATES)
public class RatesController {

  private final RatesService ratesService;

  @Autowired
  public RatesController(RatesService ratesService) {
    this.ratesService = ratesService;
  }

  @GetMapping
  public RateDto getRates(
      @RequestParam @NotEmpty String base,
      @RequestParam @NotEmpty List<String> symbols) {

    log.info("Requested rates from {} to {}", base, symbols);
    return ratesService.getRateFor(base, symbols);
  }

}
