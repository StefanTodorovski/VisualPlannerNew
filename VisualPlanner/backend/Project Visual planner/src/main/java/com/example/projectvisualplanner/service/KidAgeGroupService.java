package com.example.projectvisualplanner.service;

import com.example.projectvisualplanner.model.KidAgeGroup;

import java.util.List;
import java.util.Optional;

public interface KidAgeGroupService {

    List<KidAgeGroup> findAll();

    Optional<KidAgeGroup> findById(Long id);
}
