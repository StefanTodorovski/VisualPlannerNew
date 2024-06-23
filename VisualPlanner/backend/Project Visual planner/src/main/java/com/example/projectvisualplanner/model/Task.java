package com.example.projectvisualplanner.model;

import com.example.projectvisualplanner.model.enums.ImportanceLevel;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long id;

    @Column(name = "description")
    private String description;


    @Column(name = "task_importance_level")
    @Enumerated(EnumType.STRING)
    private ImportanceLevel importanceLevel;

    @Column(name = "points")
    private double price;

    @Column(name = "picture")
    private byte[] picture;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "group_id")
    private KidAgeGroup kidAgeGroup;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "task_type_id")
    private TaskType taskType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    public Task() {
    }

    public Task(Long id, String description, ImportanceLevel importanceLevel, double price, KidAgeGroup kidAgeGroup, TaskType taskType, User user) {
        this.id = id;
        this.description = description;
        this.importanceLevel = importanceLevel;
        this.price = price;
        this.kidAgeGroup = kidAgeGroup;
        this.taskType = taskType;
        this.user = user;
    }
}
