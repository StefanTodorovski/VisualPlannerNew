package com.example.projectvisualplanner.model.dto;

import com.example.projectvisualplanner.model.Availability;
import com.example.projectvisualplanner.model.Request;
import lombok.Data;

@Data

public class RequestDto {
    private Long requestId;
    private Long postId;
    private Request.RequestStatus status;
    private Long userPosterId;
    private Long userRequesterId;
    private Long availabilityId;
    private String userPosterName;
    private String userRequesterName;
    private String PostName;
    private String availabilityTime;


    public Request toRequest(Availability availability) {
        Request request = new Request();
        request.setAvailability(availability);
        request.setStatus(status);
        return request;
    }


}
