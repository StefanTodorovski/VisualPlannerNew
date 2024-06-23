package com.example.projectvisualplanner.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "availability")
public class Availability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "availabilityid")
    private Long id;

    @Column(name = "datetime_from")
    private LocalDateTime dateTimeFrom;

    @Column(name = "datetime_to")
    private LocalDateTime dateTimeTo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    private Task task;

    public Availability() {
    }

    public Availability(LocalDateTime dateTimeFrom, LocalDateTime dateTimeTo)
    {
        this.dateTimeFrom=dateTimeFrom;
        this.dateTimeTo=dateTimeTo;
    }

    public Availability(Long id, LocalDateTime dateTimeFrom, LocalDateTime dateTimeTo, Task task) {
        this.id = id;
        this.dateTimeFrom = dateTimeFrom;
        this.dateTimeTo = dateTimeTo;
        this.task = task;
    }
}
