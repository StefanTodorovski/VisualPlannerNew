package com.example.projectvisualplanner.repository;

import com.example.projectvisualplanner.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByTaskTypeId(Long activityTypeId);
    List<Task> findAllByUserId(Long userId);
}
