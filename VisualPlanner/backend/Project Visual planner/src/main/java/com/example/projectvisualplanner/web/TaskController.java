package com.example.projectvisualplanner.web;

import com.example.projectvisualplanner.model.dto.TaskDto;
import com.example.projectvisualplanner.model.dto.TaskWithReviewsDto;
import com.example.projectvisualplanner.model.requests.TaskRequest;
import com.example.projectvisualplanner.service.TaskService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = {"*"})
public class TaskController {

    private final TaskService taskService;
    private final static int PAGE_SIZE = 6;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<TaskDto>> getPaginatedPosts(
            @RequestParam(required = false) Long activityTypeId,
            @RequestParam(defaultValue = "0") int page
    ) {
        Pageable pageable = PageRequest.of(page, PAGE_SIZE);
        return ResponseEntity.ok().body(this.taskService.findAllPaginated(activityTypeId, pageable));
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> getPosts() {
        return ResponseEntity.ok().body(this.taskService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskWithReviewsDto> getPostById(@PathVariable Long id) {
        return this.taskService.findById(id).map(post -> ResponseEntity.ok().body(post))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<TaskDto> createPost(@RequestBody TaskRequest task) {
        TaskDto newPost = this.taskService.create(task);
        return new ResponseEntity<>(newPost, HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<TaskDto> updatePost(@PathVariable Long id,
                                              @RequestBody TaskRequest taskRequest) {
        TaskDto updatedPost = this.taskService.update(id, taskRequest);
        return new ResponseEntity<>(updatedPost, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        this.taskService.delete(id);
        return new ResponseEntity<>("Task deleted successfully!", HttpStatus.OK);
    }

    @GetMapping("/{postId}/user")
    public ResponseEntity<Long> getUserIdByPostId(@PathVariable Long postId) {
        Optional<Long> userId = taskService.findUserIdByPostId(postId);
        return userId.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

