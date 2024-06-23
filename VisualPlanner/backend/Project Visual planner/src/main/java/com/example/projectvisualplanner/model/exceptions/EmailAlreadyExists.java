package com.example.projectvisualplanner.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT)
public class EmailAlreadyExists extends RuntimeException {
    public EmailAlreadyExists(){
        super("An account with this email already exists");
    }
}
