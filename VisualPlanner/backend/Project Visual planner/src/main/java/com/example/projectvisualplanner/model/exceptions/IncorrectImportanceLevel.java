package com.example.projectvisualplanner.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class IncorrectImportanceLevel extends RuntimeException {
    public IncorrectImportanceLevel() {
        super("Invalid Pet Size provided");
    }
}
