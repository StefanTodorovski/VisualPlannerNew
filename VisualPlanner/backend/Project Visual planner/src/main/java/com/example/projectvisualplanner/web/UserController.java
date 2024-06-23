package com.example.projectvisualplanner.web;

import com.example.projectvisualplanner.model.User;
import com.example.projectvisualplanner.model.dto.TaskDto;
import com.example.projectvisualplanner.model.dto.RequestDto;
import com.example.projectvisualplanner.model.requests.UserRequest;
import com.example.projectvisualplanner.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"*"})
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(this.userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<User> createUser(@RequestBody UserRequest userRequest) {
        User newUser = this.userService.create(userRequest);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id,
                                           @RequestBody UserRequest userRequest) {
        User updatedUser = this.userService.update(id, userRequest);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        this.userService.delete(id);
        return new ResponseEntity<>("User deleted successfully!", HttpStatus.OK);
    }


    @GetMapping("/list-posts/{userId}")
    public ResponseEntity<List<TaskDto>> getAllUserPosts(@PathVariable Long userId) {
        return ResponseEntity.ok().body(this.userService.findAllUserPosts(userId));
    }
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody UserRequest userRequest) {
        String email = userRequest.email;
        String password = userRequest.password;

        User authenticatedUser = userService.authenticate(email, password);

        return ResponseEntity.ok().body(authenticatedUser);
    }
    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response){
        request.getSession().invalidate();
    }

    @GetMapping("/name/{id}")
    public ResponseEntity<String> getUserNameById(@PathVariable Long id) {
        String userName = userService.getName(id);
        return ResponseEntity.ok().body(userName);
    }
    @GetMapping("/user-poster/{id}")
    public ResponseEntity<List<RequestDto>> getRequestsByUserPosterId(@PathVariable Long id){
        return ResponseEntity.ok().body(this.userService.getRequestsByUserPosterId(id));
    }

    @GetMapping("/user-requester/{id}")
    public ResponseEntity<List<RequestDto>> getRequestsByUserRequesterId(@PathVariable Long id){
        return ResponseEntity.ok().body(this.userService.getRequestsByUserRequesterId(id));
    }

    @GetMapping("/{id}/role")
    public ResponseEntity<Integer> getRoleIdByUserId(@PathVariable Long id) {
        return userService.findById(id)
                .map(user -> ResponseEntity.ok().body(user.getRoleId()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/points")
    public ResponseEntity<Integer> getPointsByUserId(@PathVariable Long id) {
        return userService.findById(id)
                .map(user -> ResponseEntity.ok().body(user.getPoints()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
