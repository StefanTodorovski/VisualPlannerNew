package com.example.projectvisualplanner.web;

import com.example.projectvisualplanner.model.dto.ReviewDto;
import com.example.projectvisualplanner.model.requests.ReviewRequest;
import com.example.projectvisualplanner.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/reviews")
@CrossOrigin(origins = {"*"})

public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    @GetMapping
    public ResponseEntity<List<ReviewDto>> getReviews() {
        return ResponseEntity.ok().body(this.reviewService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewDto> getReviewById(@PathVariable Long id) {
        return this.reviewService.findById(id).map(review -> ResponseEntity.ok().body(review))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<ReviewDto> createReview(@RequestBody ReviewRequest review) {
        ReviewDto newReview = this.reviewService.create(review);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {
        this.reviewService.delete(id);
        return new ResponseEntity<>("Review deleted successfully!", HttpStatus.OK);
    }
    @PutMapping(value = "{id}")
    public ResponseEntity<ReviewDto> updateReview(@PathVariable Long id,
                                                  @RequestBody ReviewRequest reviewRequest) {
        ReviewDto updatedReview = this.reviewService.update(id, reviewRequest);
        return new ResponseEntity<>(updatedReview, HttpStatus.OK);
    }
}
