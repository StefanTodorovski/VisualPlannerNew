package com.example.projectvisualplanner.model.dto;

import com.example.projectvisualplanner.model.Availability;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class AvailabilityParser {


    public static Availability parseAvailability(String selectedAvailability) {
        // Define the date format of the selectedAvailability string
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

        // Parse the selectedAvailability string to obtain start and end LocalDateTime objects
        LocalDateTime startDateTime = LocalDateTime.parse(selectedAvailability, formatter);
        // Assuming end date is 1 hour later than start date for simplicity
        LocalDateTime endDateTime = startDateTime.plusHours(1);

        // Create and return an Availability object with the parsed start and end LocalDateTime objects
        return new Availability(startDateTime, endDateTime);
    }
}
