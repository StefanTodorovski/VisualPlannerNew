package com.example.projectvisualplanner.repository;

import com.example.projectvisualplanner.model.TaskType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskTypeRepository extends JpaRepository<TaskType, Long> {

    List<TaskType> findAllByTypeContains(String filter);
}

