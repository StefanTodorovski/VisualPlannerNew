package com.example.projectvisualplanner.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class KidAgeGroupNotFound extends RuntimeException {
    public KidAgeGroupNotFound(Long id) {
        super(String.format("Pet Type with id %d not found", id));
    }
}