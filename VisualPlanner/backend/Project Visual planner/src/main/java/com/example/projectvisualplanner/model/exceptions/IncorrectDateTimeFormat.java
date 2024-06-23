package com.example.projectvisualplanner.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class IncorrectDateTimeFormat extends RuntimeException {
    public IncorrectDateTimeFormat(String message){
        super(message);
    }
}