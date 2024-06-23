package com.example.projectvisualplanner.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class TaskTypeNotFound extends RuntimeException {
    public TaskTypeNotFound(Long id) {
        super(String.format("Activity Type with id %d not found", id));
    }
}