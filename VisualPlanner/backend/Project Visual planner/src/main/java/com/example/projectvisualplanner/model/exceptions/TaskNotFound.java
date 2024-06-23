package com.example.projectvisualplanner.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class TaskNotFound extends RuntimeException {
    public TaskNotFound(Long id) {
        super(String.format("Task with id %d not found", id));
    }
}
