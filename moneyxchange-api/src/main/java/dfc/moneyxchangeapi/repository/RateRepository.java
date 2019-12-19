package dfc.moneyxchangeapi.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dfc.moneyxchangeapi.domain.Rate;

@Repository
public interface RateRepository extends JpaRepository<Rate, Long> {

  Optional<Rate> findOneByName(String name);

}
