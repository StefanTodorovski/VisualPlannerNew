package com.example.projectvisualplanner.service;

import com.example.projectvisualplanner.model.dto.TaskDto;
import com.example.projectvisualplanner.model.dto.TaskWithReviewsDto;
import com.example.projectvisualplanner.model.requests.TaskRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    List<TaskDto> findAll();
    Optional<TaskWithReviewsDto> findById(Long id);
    TaskDto create(TaskRequest taskRequest);
    TaskDto update(Long id, TaskRequest taskRequest);
    void delete(Long id);
    Page<TaskDto> findAllPaginated(Long activityTypeId, Pageable pageable);
    Optional<Long> findUserIdByPostId(Long postId);

}
