package com.example.projectvisualplanner.model.dto;

import lombok.Data;

@Data

public class ReviewDto {

    public Long id;
    public String comment;
    public double rating;
    public Long userId;
    public String user;
    public byte[] picture;
    public Long postId;

}
