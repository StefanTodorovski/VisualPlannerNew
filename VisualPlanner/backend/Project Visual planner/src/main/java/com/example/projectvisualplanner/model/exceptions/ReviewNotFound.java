package com.example.projectvisualplanner.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)

public class ReviewNotFound extends RuntimeException{
    public ReviewNotFound(Long id) {
        super(String.format("Review with id %d not found", id));
    }

}