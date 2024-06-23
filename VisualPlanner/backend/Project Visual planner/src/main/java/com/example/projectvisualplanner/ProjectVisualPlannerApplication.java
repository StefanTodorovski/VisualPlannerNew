package com.example.projectvisualplanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class ProjectVisualPlannerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectVisualPlannerApplication.class, args);
    }

}
