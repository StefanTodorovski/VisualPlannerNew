package com.example.projectvisualplanner.service.impl;

import com.example.projectvisualplanner.model.TaskType;
import com.example.projectvisualplanner.repository.TaskTypeRepository;
import com.example.projectvisualplanner.service.ActivityTypeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityTypeServiceImpl implements ActivityTypeService {

    private final TaskTypeRepository taskTypeRepository;

    public ActivityTypeServiceImpl(TaskTypeRepository taskTypeRepository) {
        this.taskTypeRepository = taskTypeRepository;
    }

    @Override
    public List<TaskType> findAll() {
        return this.taskTypeRepository.findAll();
    }

    @Override
    public Optional<TaskType> findById(Long id) {
        return this.taskTypeRepository.findById(id);
    }
}
