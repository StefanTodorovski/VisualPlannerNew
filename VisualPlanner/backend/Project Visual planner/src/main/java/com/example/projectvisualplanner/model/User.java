package com.example.projectvisualplanner.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "phone")
    private String phone;

    @Column(name = "location")
    private String location;

    @Column(name = "bio")
    private String bio;

    @Column(name = "picture")
    private byte[] picture;

    @Column(name = "user_description")
    private String petDescription;

    @Column(name = "role_id")
    private int roleId;

    public User() {
    }

    public User(Long id, String name, String surname, String email, String password, String phone, String location, String bio, byte[] picture, String petDescription, int roleId) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.location = location;
        this.bio = bio;
        this.picture = picture;
        this.petDescription = petDescription;
        this.roleId = roleId;
    }
}
