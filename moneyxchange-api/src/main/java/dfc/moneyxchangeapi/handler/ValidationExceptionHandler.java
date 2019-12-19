package dfc.moneyxchangeapi.handler;

import javax.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ValidationExceptionHandler {

  @ExceptionHandler(MissingServletRequestParameterException.class)
  public ResponseEntity<?> handle(MissingServletRequestParameterException exception) {
    log.error("Missing mandatory parameters", exception);
    return ResponseEntity
        .badRequest()
        .body("Missing parameter: " + exception.getParameterName());
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<?> handle(ConstraintViolationException exception) {
    log.error("Validation failed", exception);
    return ResponseEntity
        .badRequest()
        .body("Validation failed: " + exception.getMessage());
  }

}
