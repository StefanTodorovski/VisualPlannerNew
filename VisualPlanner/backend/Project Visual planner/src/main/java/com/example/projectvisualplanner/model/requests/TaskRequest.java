package com.example.projectvisualplanner.model.requests;

import java.util.List;

public class TaskRequest {
    public String description;
    public String petSize;
    public double price;
    public Long petTypeId;
    public Long activityTypeId;
    public Long userId;
    public byte[] picture;
    public List<AvailabilityRequest> availabilities;
}

