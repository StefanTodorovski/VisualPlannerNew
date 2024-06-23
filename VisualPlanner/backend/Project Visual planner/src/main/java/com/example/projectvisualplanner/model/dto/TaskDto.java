package com.example.projectvisualplanner.model.dto;

import com.example.projectvisualplanner.model.requests.AvailabilityRequest;
import lombok.Data;

import java.util.List;

@Data
public class TaskDto {
    public Long id;
    public String description;
    public String petSize;
    public double price;
    public Long petTypeId;
    public Long activityTypeId;
    public String activityTypeName;
    public Long userId;
    public String user;
    private byte[] picture;
    public List<AvailabilityRequest> availabilities;
}
