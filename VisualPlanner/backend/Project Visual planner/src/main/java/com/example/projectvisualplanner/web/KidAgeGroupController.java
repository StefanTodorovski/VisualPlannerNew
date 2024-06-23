package com.example.projectvisualplanner.web;

import com.example.projectvisualplanner.model.KidAgeGroup;
import com.example.projectvisualplanner.service.KidAgeGroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pet-types")
@CrossOrigin(origins = {"*"})
public class KidAgeGroupController {

    private final KidAgeGroupService kidAgeGroupService;

    public KidAgeGroupController(KidAgeGroupService kidAgeGroupService) {
        this.kidAgeGroupService = kidAgeGroupService;
    }

    @GetMapping
    public ResponseEntity<List<KidAgeGroup>> getPetTypes(){
        return ResponseEntity.ok().body(this.kidAgeGroupService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<KidAgeGroup>> getPetType(@PathVariable Long id){
        return ResponseEntity.ok().body(this.kidAgeGroupService.findById(id));
    }
}
