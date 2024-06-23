package com.example.projectvisualplanner.config;

import com.example.projectvisualplanner.model.Availability;
import com.example.projectvisualplanner.model.Task;
import com.example.projectvisualplanner.model.Request;
import com.example.projectvisualplanner.model.Review;
import com.example.projectvisualplanner.model.dto.TaskDto;
import com.example.projectvisualplanner.model.dto.RequestDto;
import com.example.projectvisualplanner.model.dto.ReviewDto;
import com.example.projectvisualplanner.model.requests.AvailabilityRequest;
import org.modelmapper.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;



@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper dtoMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.addMappings(postDtoPropertyMap());
        modelMapper.addMappings(reviewDtoPropertyMap());
        modelMapper.addMappings(requestDtoPropertyMap());
        configureAvailabilityMapping(modelMapper);
        return modelMapper;
    }

    private PropertyMap<Task, TaskDto> postDtoPropertyMap() {
        return new PropertyMap<Task, TaskDto>() {
            @Override
            protected void configure() {
                map().setId(source.getId());
                map().setDescription(source.getDescription());
                //map().setImportanceLevel(source.getImportanceLevel());
                map().setPrice(source.getPrice());
                map().setPetTypeId(source.getKidAgeGroup().getId());
                map().setActivityTypeId(source.getTaskType().getId());
                map().setPicture(source.getPicture());
                map().setUserId(source.getUser().getId());
                map().setActivityTypeName(source.getTaskType().getType());
            }
        };
    }

    private PropertyMap<Review, ReviewDto> reviewDtoPropertyMap() {
        return new PropertyMap<Review, ReviewDto>() {
            @Override
            protected void configure() {
                map().setId(source.getId());
                map().setComment(source.getComment());
                map().setRating(source.getRating());
                map().setUserId(source.getUser().getId());
                map().setPicture(source.getUser().getPicture());
                map().setPostId(source.getTask().getId());
            }
        };
    }

    private PropertyMap<Request, RequestDto> requestDtoPropertyMap() {
        return new PropertyMap<Request, RequestDto>() {
            @Override
            protected void configure() {
                map().setRequestId(source.getId());
                map().setAvailabilityId(source.getAvailability().getId());
                map().setUserPosterId(source.getUserPoster().getId());
                map().setUserRequesterId(source.getUserRequester().getId());
                map().setStatus(source.getStatus());
                map().setPostId(source.getTask().getId());
                map().setAvailabilityTime("");
            }
        };
    }

    private void configureAvailabilityMapping(ModelMapper modelMapper) {
        modelMapper.createTypeMap(Availability.class, AvailabilityRequest.class)
                .addMappings(mapping -> {
                    mapping.using(localDateTimeToStringConverter())
                            .map(Availability::getDateTimeFrom, AvailabilityRequest::setDateTimeFrom);
                    mapping.using(localDateTimeToStringConverter())
                            .map(Availability::getDateTimeTo, AvailabilityRequest::setDateTimeTo);
                    mapping.map(Availability::getId, AvailabilityRequest::setId);
                });
    }

    @Bean
    public Converter<LocalDateTime, String> localDateTimeToStringConverter() {
        return new AbstractConverter<LocalDateTime, String>() {
            @Override
            protected String convert(LocalDateTime source) {
                return source != null ? source.format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss")) : null;
            }
        };
    }

}
