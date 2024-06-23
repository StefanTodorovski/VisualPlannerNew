package com.example.projectvisualplanner.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "kid_age_group")
public class KidAgeGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private Long id;

    @Column(name = "type")
    private String type;

    public KidAgeGroup() {
    }

    public KidAgeGroup(Long id, String type) {
        this.id = id;
        this.type = type;
    }
}
