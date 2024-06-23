package com.example.projectvisualplanner.repository;

import com.example.projectvisualplanner.model.KidAgeGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KidAgeGroupRepository extends JpaRepository<KidAgeGroup, Long> {
}
