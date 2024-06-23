package com.example.projectvisualplanner.model.dto;

import com.example.projectvisualplanner.model.requests.AvailabilityRequest;
import lombok.Data;

import java.util.List;

@Data

public class TaskWithReviewsDto {
    public Long id;
    public String description;
    public String petSize;
    public double price;
    public Long petTypeId;
    public String petType;
    public Long activityTypeId;
    public String activityType;
    public Long userId;
    public String user;
    public List<AvailabilityRequest> availabilities;
    public List<ReviewDto> reviews;
    public byte[] picture;

}