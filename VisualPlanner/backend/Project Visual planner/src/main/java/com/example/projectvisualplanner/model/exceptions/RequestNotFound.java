package com.example.projectvisualplanner.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class RequestNotFound extends RuntimeException {
    public RequestNotFound(Long id) {
        super(String.format("Request with id %d not found", id));
    }
}