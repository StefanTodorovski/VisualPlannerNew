package com.example.projectvisualplanner.service.impl;

import com.example.projectvisualplanner.model.Availability;
import com.example.projectvisualplanner.model.Task;
import com.example.projectvisualplanner.model.Request;
import com.example.projectvisualplanner.model.User;
import com.example.projectvisualplanner.model.exceptions.AvailabilityNotFoundException;
import com.example.projectvisualplanner.model.exceptions.TaskNotFoundException;
import com.example.projectvisualplanner.model.exceptions.RequestNotFound;
import com.example.projectvisualplanner.model.exceptions.UserNotFound;
import com.example.projectvisualplanner.repository.AvailabilityRepository;
import com.example.projectvisualplanner.repository.TaskRepository;
import com.example.projectvisualplanner.repository.RequestRepository;
import com.example.projectvisualplanner.repository.UserRepository;
import com.example.projectvisualplanner.service.RequestService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final AvailabilityRepository availabilityRepository;

    public RequestServiceImpl(RequestRepository requestRepository, UserRepository userRepository,
                              TaskRepository taskRepository, AvailabilityRepository availabilityRepository) {
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.availabilityRepository = availabilityRepository;
    }

    @Override
    public List<Request> findAll() {
        return requestRepository.findAll();
    }

    @Override
    public Optional<Request> findById(Long id) {
        return requestRepository.findById(id);
    }

    @Override
    public Request create(Request request, Long availabilityId, Long userId ) {
        // Fetch task and userRequester based on their IDs

        Availability availability = this.availabilityRepository.findById(availabilityId)
                .orElseThrow(() -> new AvailabilityNotFoundException(availabilityId));
        Task task = taskRepository.findById(availability.getTask().getId())
                .orElseThrow(() -> new TaskNotFoundException(availability.getTask().getId()));
        User userRequester = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFound(userId));

        //request.setTask(task);
        request.setAvailability(availability);
        request.setTask(task);
        request.setUserRequester(userRequester);
        request.setUserPoster(task.getUser());
        request.setStatus(Request.RequestStatus.PENDING);

        // Save the request
        return requestRepository.save(request);
    }

    @Override
    public void acceptRequest(Long id, Long availabilityId) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new RequestNotFound(id));
        request.setStatus(Request.RequestStatus.ACCEPTED);

//        Availability availability = this.availabilityRepository.findById(availabilityId)
//                        .orElseThrow(() -> new AvailabilityNotFoundException(availabilityId));

//        this.availabilityRepository.deleteById(availabilityId);
        //this.availabilityRepository.delete(availability);
        requestRepository.save(request);
    }

    @Override
    public void declineRequest(Long requestId) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RequestNotFound(requestId));
        request.setStatus(Request.RequestStatus.DECLINED);
        requestRepository.save(request);
    }

    @Override
    public List<Request> getRequestsByUserId(Long userId) {
        return requestRepository.findByUserPosterId(userId);
    }

}
