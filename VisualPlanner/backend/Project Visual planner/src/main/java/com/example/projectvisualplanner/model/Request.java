package com.example.projectvisualplanner.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "request")
public class Request {

    public enum RequestStatus {
        PENDING,
        ACCEPTED,
        DECLINED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "requestid")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_poster_id")
    private User userPoster;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "task_id")
    private Task task;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "availability_id")
    private Availability availability;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_requester_id")
    private User userRequester;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private RequestStatus status;

    public Request() {
    }

    public Request(Long id, User userPoster, Task task, Availability availability, User userRequester, RequestStatus status) {
        this.id = id;
        this.userPoster = userPoster;
        this.task = task;
        this.availability = availability;
        this.userRequester = userRequester;
        this.status = status;
    }
}
