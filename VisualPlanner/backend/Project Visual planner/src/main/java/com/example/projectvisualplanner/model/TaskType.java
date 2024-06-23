package com.example.projectvisualplanner.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tasktype")
public class TaskType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_type_id")
    private Long id;

    private String type;

    public TaskType() {
    }

    public TaskType(Long id, String type) {
        this.id = id;
        this.type = type;
    }

    public TaskType(String type) {
        this.type = type;
    }
}

