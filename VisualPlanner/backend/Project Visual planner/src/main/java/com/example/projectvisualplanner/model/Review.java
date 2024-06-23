package com.example.projectvisualplanner.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewid")
    private Long id;

    @Column(name = "comment")
    private String comment;

    @Column(name = "rating")
    private double rating;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "task_id")
    private Task task;

    public Review() {
    }

    public Review(Long id, String comment, double rating, User user, Task task) {
        this.id = id;
        this.comment = comment;
        this.rating = rating;
        this.user = user;
        this.task = task;
    }
}