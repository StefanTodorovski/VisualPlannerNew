package com.example.projectvisualplanner.model.exceptions;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(Long postId) {
        super("Task not found with ID: " + postId);
    }
}
