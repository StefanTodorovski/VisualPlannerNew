package com.example.projectvisualplanner.repository;

import com.example.projectvisualplanner.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByUserPosterId(Long userId);
    List<Request> findByUserPosterIdAndStatus(Long userId, Request.RequestStatus status);
    List<Request> findAllByUserRequesterId(Long userId);
    List<Request> findAllByTaskId(Long postId);
    List<Request> findAllByAvailabilityId(Long availabilityId);
    void deleteByTaskId(Long id);

}
