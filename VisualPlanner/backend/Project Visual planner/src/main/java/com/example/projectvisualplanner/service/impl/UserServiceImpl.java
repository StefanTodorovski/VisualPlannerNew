package com.example.projectvisualplanner.service.impl;

import com.example.projectvisualplanner.model.Availability;
import com.example.projectvisualplanner.model.Task;

import com.example.projectvisualplanner.model.Request;
import com.example.projectvisualplanner.model.User;
import com.example.projectvisualplanner.model.dto.TaskDto;
import com.example.projectvisualplanner.model.dto.RequestDto;
import com.example.projectvisualplanner.model.exceptions.*;
import com.example.projectvisualplanner.model.requests.UserRequest;
import com.example.projectvisualplanner.repository.AvailabilityRepository;
import com.example.projectvisualplanner.repository.TaskRepository;
import com.example.projectvisualplanner.repository.RequestRepository;
import com.example.projectvisualplanner.repository.UserRepository;
import com.example.projectvisualplanner.service.UserService;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Service;

import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private final TaskRepository taskRepository;
    private final ModelMapper modelMapper;

    private final PasswordEncoder passwordEncoder;
    private final RequestRepository requestRepository;
    private final AvailabilityRepository availabilityRepository;


    public UserServiceImpl(UserRepository userRepository, TaskRepository taskRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder, RequestRepository requestRepository, AvailabilityRepository availabilityRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.requestRepository = requestRepository;
        this.availabilityRepository = availabilityRepository;
    }


    @Override

    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return Optional.of(this.userRepository.findById(id).orElseThrow(() -> new UserNotFound(id)));
    }

    @Override
    public Optional<User> findByemail(String email) {
        return Optional.of(this.userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email)));
    }


    @Override
    public User create(UserRequest userRequest) {
        User user = new User();

        emailChecks(userRequest.email);
        phoneCheck(userRequest.phone);

        user.setName(userRequest.name);
        user.setSurname(userRequest.surname);
        user.setEmail(userRequest.email);

        String encodedPassword = passwordEncoder.encode(userRequest.password);
        user.setPassword(encodedPassword);

        user.setPhone(userRequest.phone);
        user.setLocation(userRequest.location);
        user.setBio(userRequest.bio);
        user.setPicture(userRequest.picture);
        user.setPetDescription(userRequest.petDescription);
        user.setRoleId(1);

        return this.userRepository.save(user);
    }

    @Override
    public User update(Long id, UserRequest userRequest) {
        User user = this.userRepository.findById(id).orElseThrow(() -> new UserNotFound(id));

        user.setName(userRequest.name);
        user.setSurname(userRequest.surname);
        user.setEmail(userRequest.email);
        phoneCheck(userRequest.phone);

//        user.setPassword(userRequest.password);
        user.setPhone(userRequest.phone);
        user.setLocation(userRequest.location);
//        user.setBio(userRequest.bio);
        user.setPicture(userRequest.picture);  // TODO: implement Base64 encoder for images
        user.setPetDescription(userRequest.petDescription);

        return this.userRepository.save(user);
    }

    @Override
    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User with email " + email + " not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return user;
    }


    @Override
    public void delete(Long id) {
        User user = this.userRepository.findById(id).orElseThrow(() -> new TaskNotFound(id));
        this.userRepository.delete(user);
    }

    @Override
    public String getName(Long id) {
        User user = this.userRepository.findById(id).orElseThrow(() -> new UserNotFound(id));
        return user.getName();
    }

    @Override
    public List<TaskDto> findAllUserPosts(Long userId) {
        this.userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFound(userId));

        List<Task> postsByUser = this.taskRepository.findAllByUserId(userId);
        List<TaskDto> taskDtos = postsByUser.stream().map(post -> modelMapper.map(post, TaskDto.class)).toList();

        for (TaskDto taskDto : taskDtos) {
            taskDto.setUser(getPostUser(taskDto.getUserId()));
        }

        return taskDtos;
    }

    @Override
    public List<RequestDto> getRequestsByUserPosterId(Long id) {
//        List<Request> requests = new ArrayList<>();
//        List<Task> posts = this.postRepository.findAllByUserId(id);
//
//        for ( Task p : posts){
//            Long temp_p = p.getId();
//            List<Request> rq =  requestRepository.findAllByPostId(temp_p);
//            requests.addAll(rq);
//        }
//        return requests;
        List<Request> request = this.requestRepository.findByUserPosterIdAndStatus(id, Request.RequestStatus.PENDING);
        return getRequestDtos(request);
    }

    @Override
    public List<RequestDto> getRequestsByUserRequesterId(Long id) {
        List<Request> request = this.requestRepository.findAllByUserRequesterId(id);
        return getRequestDtos(request);
    }

    private List<RequestDto> getRequestDtos(List<Request> request) {
        List<RequestDto> requestDtos = request.stream()
                .map(req -> modelMapper.map(req, RequestDto.class)).toList();
        for (RequestDto requestDto: requestDtos) {
            User userRequester = this.userRepository.findById(requestDto.getUserRequesterId())
                    .orElseThrow(() -> new UserNotFound(requestDto.getUserRequesterId()));
            User userPoster = this.userRepository.findById(requestDto.getUserPosterId())
                    .orElseThrow(() -> new UserNotFound(requestDto.getUserPosterId()));
            Task task = this.taskRepository.findById(requestDto.getPostId())
                    .orElseThrow(() -> new TaskNotFound(requestDto.getPostId()));
            Availability availability = this.availabilityRepository.findById(requestDto.getAvailabilityId())
                    .orElseThrow(() -> new AvailabilityNotFoundException(requestDto.getAvailabilityId()));

            requestDto.setUserRequesterName(userRequester.getName() + " " + userRequester.getSurname());
            requestDto.setUserPosterName(userPoster.getName() + " " + userPoster.getSurname());
            requestDto.setPostName(task.getTaskType().getType());
            requestDto.setAvailabilityTime(availability.getDateTimeFrom().toString() + " - " + availability.getDateTimeTo().toString());
        }
        return requestDtos;
    }

    private String getPostUser(Long userId) {
        User user = this.userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFound(userId));
        return user.getName() + " " + user.getSurname();
    }

    public void emailChecks(String email) {
        if (this.userRepository.findByEmail(email).isPresent()) {
            throw new EmailAlreadyExists();
        }
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        if (!email.matches(emailRegex)) {
            throw new IncorrectEmailFormat();
        }
    }

    public void phoneCheck(String phoneNumber) {
        String phoneRegex = "^\\d{9}$"; // 9 cifri samo spoeni 000000000
        if (phoneNumber != null && !phoneNumber.matches(phoneRegex)) { //staviv phoneNumber!=null u slucaj ako ne e zadolzitelno telf broj za profil
            throw new InvalidPhoneNumberFormatException();
        }
    }
}

