package com.example.projectvisualplanner.service.impl;

import com.example.projectvisualplanner.model.KidAgeGroup;
import com.example.projectvisualplanner.repository.KidAgeGroupRepository;
import com.example.projectvisualplanner.service.KidAgeGroupService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KidAgeGroupServiceImpl implements KidAgeGroupService {

    private final KidAgeGroupRepository kidAgeGroupRepository;

    public KidAgeGroupServiceImpl(KidAgeGroupRepository kidAgeGroupRepository) {
        this.kidAgeGroupRepository = kidAgeGroupRepository;
    }

    @Override
    public List<KidAgeGroup> findAll() {
        return this.kidAgeGroupRepository.findAll();
    }

    @Override
    public Optional<KidAgeGroup> findById(Long id) {
        return this.kidAgeGroupRepository.findById(id);
    }
}

