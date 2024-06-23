package com.example.projectvisualplanner.service.impl;

import com.example.projectvisualplanner.model.enums.ImportanceLevel;
import jakarta.transaction.Transactional;
import com.example.projectvisualplanner.model.*;
import com.example.projectvisualplanner.model.dto.TaskDto;
import com.example.projectvisualplanner.model.dto.TaskWithReviewsDto;
import com.example.projectvisualplanner.model.dto.ReviewDto;
import com.example.projectvisualplanner.model.exceptions.*;
import com.example.projectvisualplanner.model.requests.AvailabilityRequest;
import com.example.projectvisualplanner.model.requests.TaskRequest;
import com.example.projectvisualplanner.repository.*;
import com.example.projectvisualplanner.service.TaskService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final KidAgeGroupRepository kidAgeGroupRepository;
    private final TaskTypeRepository taskTypeRepository;
    private final UserRepository userRepository;
    private final AvailabilityRepository availabilityRepository;
    private final ModelMapper modelMapper;
    private final ReviewRepository reviewRepository;
    private final RequestRepository requestRepository;

    public TaskServiceImpl(TaskRepository taskRepository, KidAgeGroupRepository kidAgeGroupRepository, TaskTypeRepository taskTypeRepository, UserRepository userRepository, AvailabilityRepository availabilityRepository, ModelMapper modelMapper, ReviewRepository reviewRepository, RequestRepository requestRepository) {
        this.taskRepository = taskRepository;
        this.kidAgeGroupRepository = kidAgeGroupRepository;
        this.taskTypeRepository = taskTypeRepository;
        this.userRepository = userRepository;
        this.availabilityRepository = availabilityRepository;
        this.modelMapper = modelMapper;
        this.reviewRepository = reviewRepository;
        this.requestRepository = requestRepository;
    }

    @Override
    public List<TaskDto> findAll() {
        List<TaskDto> taskDtos = this.taskRepository.findAll()
                .stream()
                .map(post -> modelMapper.map(post, TaskDto.class))
                .collect(Collectors.toList());

        for (TaskDto taskDto : taskDtos) {
            setAvailabilitiesToPostDto(taskDto.getId(), taskDto);
        }
        return taskDtos;
    }

    @Override
    public Optional<TaskWithReviewsDto> findById(Long id) {
        Task task = this.taskRepository.findById(id).orElseThrow(() -> new TaskNotFound(id));
        TaskDto taskDto = modelMapper.map(task, TaskDto.class);
        setAvailabilitiesToPostDto(id, taskDto);

        TaskWithReviewsDto taskWithReviewsDto = modelMapper.map(taskDto, TaskWithReviewsDto.class);
        List<ReviewDto> reviewDtos = reviewRepository.findAllByTaskId(taskDto.getId())
                .stream()
                .map(review -> modelMapper.map(review, ReviewDto.class))
                .collect(Collectors.toList());

        for (ReviewDto reviewDto : reviewDtos) {
            User user = this.userRepository.findById(reviewDto.getUserId())
                    .orElseThrow(() -> new UserNotFound(reviewDto.getUserId()));
            reviewDto.setUser(user.getName() + " " + user.getSurname());
        }

        taskWithReviewsDto.setReviews(reviewDtos);

        KidAgeGroup kidAgeGroup = this.kidAgeGroupRepository.findById(taskDto.getPetTypeId())
                .orElseThrow(() -> new KidAgeGroupNotFound(taskDto.getPetTypeId()));
        TaskType taskType = this.taskTypeRepository.findById(taskDto.getActivityTypeId())
                .orElseThrow(() -> new TaskTypeNotFound(taskDto.getActivityTypeId()));
        User user = this.userRepository.findById(taskDto.getUserId())
                .orElseThrow(() -> new UserNotFound(taskDto.getUserId()));

        taskWithReviewsDto.setPetType(kidAgeGroup.getType());
        taskWithReviewsDto.setActivityType(taskType.getType());
        taskWithReviewsDto.setUser(user.getName() + " " + user.getSurname());
        taskWithReviewsDto.setPicture(taskDto.getPicture());
        return Optional.of(taskWithReviewsDto);
    }

    @Override
    @Transactional
    public TaskDto create(TaskRequest taskRequest) {
        Task task = new Task();

        KidAgeGroup kidAgeGroup = kidAgeGroupRepository.findById(taskRequest.petTypeId)
                .orElseThrow(() -> new KidAgeGroupNotFound(taskRequest.petTypeId));

        TaskType taskType = taskTypeRepository.findById(taskRequest.activityTypeId)
                .orElseThrow(() -> new TaskTypeNotFound(taskRequest.activityTypeId));

        User user = userRepository.findById(taskRequest.userId)
                .orElseThrow(() -> new UserNotFound(taskRequest.userId));

        ImportanceLevel importanceLevelEnum;
        try {
            importanceLevelEnum = ImportanceLevel.valueOf(taskRequest.petSize.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IncorrectImportanceLevel();
        }

        task.setDescription(taskRequest.description);
        task.setImportanceLevel(importanceLevelEnum);
        task.setPrice(taskRequest.price);
        task.setKidAgeGroup(kidAgeGroup);
        task.setTaskType(taskType);
        task.setUser(user);
        task.setPicture(taskRequest.picture);

        processAvailabilities(task, taskRequest.availabilities);

        this.taskRepository.save(task);

        TaskDto taskDto = modelMapper.map(task, TaskDto.class);
        taskDto.setPetSize(importanceLevelEnum.toString());
        setAvailabilitiesToPostDto(taskDto.getId(), taskDto);
        return taskDto;
    }

    @Override
    @Transactional
    public TaskDto update(Long id, TaskRequest taskRequest) {
        Task task = this.taskRepository.findById(id).orElseThrow(() -> new TaskNotFound(id));
        KidAgeGroup kidAgeGroup = kidAgeGroupRepository.findById(taskRequest.petTypeId)
                .orElseThrow(() -> new KidAgeGroupNotFound(taskRequest.petTypeId));

        TaskType taskType = taskTypeRepository.findById(taskRequest.activityTypeId)
                .orElseThrow(() -> new TaskTypeNotFound(taskRequest.activityTypeId));

        ImportanceLevel importanceLevelEnum;
        try {
            importanceLevelEnum = ImportanceLevel.valueOf(taskRequest.petSize.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IncorrectImportanceLevel();
        }

        task.setDescription(taskRequest.description);
        task.setImportanceLevel(importanceLevelEnum);
        task.setPrice(taskRequest.price);
        task.setKidAgeGroup(kidAgeGroup);
        task.setTaskType(taskType);

        processAvailabilities(task, taskRequest.availabilities);

        this.taskRepository.save(task);
        TaskDto taskDto = modelMapper.map(task, TaskDto.class);
        taskDto.setPetSize(importanceLevelEnum.toString());
        setAvailabilitiesToPostDto(taskDto.getId(), taskDto);
        return taskDto;
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Task task = this.taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFound(id));
        this.availabilityRepository.deleteByTaskId(id);
        this.reviewRepository.deleteByTaskId(id);
        this.requestRepository.deleteByTaskId(id);
        this.taskRepository.delete(task);
    }

    @Override
    public Page<TaskDto> findAllPaginated(Long activityTypeId, Pageable pageable) {
        List<Task> tasks;
        if (activityTypeId != null) {
            tasks = this.taskRepository.findAllByTaskTypeId(activityTypeId);
        } else tasks = this.taskRepository.findAll();

        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        int startItem = currentPage * pageSize;

        List<TaskDto> taskDtos;
        int totalCount = tasks.size();

        if (tasks.size() < startItem) {
            taskDtos = Collections.emptyList();
        } else {
            int toIndex = Math.min(startItem + pageSize, totalCount);
            List<Task> sublist = tasks.subList(startItem, toIndex);
            taskDtos = sublist.stream()
                    .map(post -> modelMapper.map(post, TaskDto.class))
                    .collect(Collectors.toList());
        }

        for (TaskDto taskDto : taskDtos) {
            taskDto.setUser(getPostUser(taskDto.getUserId()));
        }

        return new PageImpl<>(taskDtos, pageable, totalCount);
    }

    @Override
    public Optional<Long> findUserIdByPostId(Long postId) {
        Task task = taskRepository.findById(postId).orElseThrow(() -> new TaskNotFound(postId));
        return Optional.ofNullable(task.getUser().getId());
    }

    private String getPostUser(Long userId) {
        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFound(userId));
        return user.getName() + " " + user.getSurname();
    }

    private void setAvailabilitiesToPostDto(Long postId, TaskDto taskDto) {
        List<Availability> availabilities = this.availabilityRepository.findAllByTaskId(postId);
        taskDto.setAvailabilities(availabilities
                .stream()
                .map(availability -> modelMapper.map(availability, AvailabilityRequest.class))
                .collect(Collectors.toList())
        );
    }

    private void processAvailabilities(Task task, List<AvailabilityRequest> availabilityRequests) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        LocalDateTime currentDateTime = LocalDateTime.now();

        this.availabilityRepository.deleteByTaskId(task.getId());

        List<Availability> updatedAvailabilities = new ArrayList<>();
        for (AvailabilityRequest availabilityRequest : availabilityRequests) {
            LocalDateTime localDateTimeFromParsed;
            LocalDateTime localDateTimeToParsed;
            try {
                localDateTimeFromParsed = LocalDateTime.parse(availabilityRequest.dateTimeFrom, formatter);
                localDateTimeToParsed = LocalDateTime.parse(availabilityRequest.dateTimeTo, formatter);
            } catch (DateTimeParseException e) {
                throw new IncorrectDateTimeFormat("Invalid date time format provided");
            }

            if (localDateTimeFromParsed.isAfter(localDateTimeToParsed)) {
                throw new IncorrectDateTimeFormat("Date Time From cannot be after Date Time To");
            }

            if (localDateTimeFromParsed.isBefore(currentDateTime) || localDateTimeToParsed.isBefore(currentDateTime)) {
                throw new IncorrectDateTimeFormat("Date Time parameters cannot be in the past");
            }

            Availability availability = new Availability();
            availability.setDateTimeFrom(localDateTimeFromParsed);
            availability.setDateTimeTo(localDateTimeToParsed);
            availability.setTask(task);

            updatedAvailabilities.add(availability);
        }

        this.availabilityRepository.saveAll(updatedAvailabilities);
    }



}
