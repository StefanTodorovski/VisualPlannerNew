package com.example.projectvisualplanner.web;

import com.example.projectvisualplanner.model.TaskType;
import com.example.projectvisualplanner.service.ActivityTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/activity-types")
@CrossOrigin(origins = {"*"})
public class ActivityTypeController {

    private final ActivityTypeService activityTypeService;

    public ActivityTypeController(ActivityTypeService activityTypeService) {
        this.activityTypeService = activityTypeService;
    }

    @GetMapping
    public ResponseEntity<List<TaskType>> getActivityTypes(){
        return ResponseEntity.ok().body(this.activityTypeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<TaskType>> getActivityType(@PathVariable Long id){
        return ResponseEntity.ok().body(this.activityTypeService.findById(id));
    }
}

