package com.example.projectvisualplanner.service.impl;

import com.example.projectvisualplanner.model.Task;
import com.example.projectvisualplanner.model.Review;
import com.example.projectvisualplanner.model.User;
import com.example.projectvisualplanner.model.dto.ReviewDto;
import com.example.projectvisualplanner.model.exceptions.TaskNotFound;
import com.example.projectvisualplanner.model.exceptions.ReviewNotFound;
import com.example.projectvisualplanner.model.exceptions.UserNotFound;
import com.example.projectvisualplanner.model.requests.ReviewRequest;
import com.example.projectvisualplanner.repository.TaskRepository;
import com.example.projectvisualplanner.repository.ReviewRepository;
import com.example.projectvisualplanner.repository.UserRepository;
import com.example.projectvisualplanner.service.ReviewService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    private final ModelMapper modelMapper;
    public ReviewServiceImpl(ReviewRepository reviewRepository, UserRepository userRepository, TaskRepository taskRepository, ModelMapper modelMapper){
        this.reviewRepository=reviewRepository;
        this.userRepository=userRepository;
        this.taskRepository = taskRepository;
        this.modelMapper=modelMapper;
    }

    @Override
    public List<ReviewDto> findAll() {


        return this.reviewRepository.findAll()
                .stream()
                .map(review -> modelMapper.map(review, ReviewDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ReviewDto> findById(Long id) {
        Review review = reviewRepository.findById(id).orElseThrow(() -> new ReviewNotFound(id));
        ReviewDto reviewDto = modelMapper.map(review, ReviewDto.class);

        return Optional.ofNullable(reviewDto);
    }

    @Override
    public ReviewDto create(ReviewRequest reviewRequest) {
        Review review = new Review();

        User user = userRepository.findById(reviewRequest.userId)
                .orElseThrow(() -> new UserNotFound(reviewRequest.userId));

        Task task = taskRepository.findById(reviewRequest.postId)
                .orElseThrow(() -> new TaskNotFound(reviewRequest.postId));
        review.setUser(user);
        review.setTask(task);
        review.setRating(reviewRequest.rating); //rating pretpostavuvam ke se dade na izbor kako dzvezdicki (ili shepi ha ha) pa nema da pravam checks za vrednosta
        review.setComment(reviewRequest.comment);

        this.reviewRepository.save(review);

        return modelMapper.map(review, ReviewDto.class);
    }

    @Override
    public void delete(Long id) {
        Review review = this.reviewRepository.findById(id)
                .orElseThrow(() -> new ReviewNotFound(id));
        this.reviewRepository.delete(review);
    }
    @Override
    public ReviewDto update(Long id, ReviewRequest reviewRequest) {
        Review review = this.reviewRepository.findById(id).orElseThrow(() -> new ReviewNotFound(id));

        review.setRating(reviewRequest.rating);
        review.setComment(reviewRequest.comment);

        this.reviewRepository.save(review);

        return modelMapper.map(review, ReviewDto.class);
    }
}