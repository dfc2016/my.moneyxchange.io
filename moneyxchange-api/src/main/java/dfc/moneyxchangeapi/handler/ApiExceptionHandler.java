package dfc.moneyxchangeapi.handler;

import javax.persistence.PersistenceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ApiExceptionHandler {

  @ExceptionHandler(PersistenceException.class)
  public ResponseEntity<?> handle(PersistenceException exception) {
    log.error("Database exception", exception);
    return ResponseEntity
        .status(HttpStatus.SERVICE_UNAVAILABLE)
        .build();
  }

}
