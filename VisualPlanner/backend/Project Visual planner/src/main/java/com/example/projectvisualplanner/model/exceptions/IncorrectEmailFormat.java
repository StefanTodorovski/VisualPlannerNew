package com.example.projectvisualplanner.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class IncorrectEmailFormat extends RuntimeException {
    public IncorrectEmailFormat(){
        super("Email should be of format mail@domain.com");
    }
}
