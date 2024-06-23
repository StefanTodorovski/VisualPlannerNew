package com.example.projectvisualplanner.repository;

import com.example.projectvisualplanner.model.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    void deleteByTaskId(Long id);
    List<Availability> findAllByTaskId(Long id);
}
