package com.example.projectvisualplanner.service;

import com.example.projectvisualplanner.model.TaskType;

import java.util.List;
import java.util.Optional;

public interface ActivityTypeService {

    List<TaskType> findAll();

    Optional<TaskType> findById(Long id);
}
