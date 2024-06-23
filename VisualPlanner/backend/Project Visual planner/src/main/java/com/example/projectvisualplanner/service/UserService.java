package com.example.projectvisualplanner.service;

import com.example.projectvisualplanner.model.User;
import com.example.projectvisualplanner.model.dto.TaskDto;
import com.example.projectvisualplanner.model.dto.RequestDto;
import com.example.projectvisualplanner.model.requests.UserRequest;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> findAll();
    Optional<User> findById(Long id);

    Optional<User> findByemail(String email);
    User create(UserRequest userRequest);
    User update(Long id, UserRequest userRequest);
    User authenticate(String email, String password);
    void delete(Long id);
    String getName(Long id);
    List<TaskDto> findAllUserPosts(Long userId);
    List<RequestDto> getRequestsByUserPosterId(Long id);

    List<RequestDto> getRequestsByUserRequesterId(Long id);
}
