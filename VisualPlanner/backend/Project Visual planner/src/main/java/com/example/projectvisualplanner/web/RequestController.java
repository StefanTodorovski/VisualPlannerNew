package com.example.projectvisualplanner.web;

import com.example.projectvisualplanner.model.Request;
import com.example.projectvisualplanner.service.TaskService;
import com.example.projectvisualplanner.service.RequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = {"*"})
public class RequestController {

    private final RequestService requestService;
    private final TaskService taskService;

    public RequestController(RequestService requestService, TaskService taskService) {
        this.requestService = requestService;
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Request>> getRequests() {
        return ResponseEntity.ok().body(this.requestService.findAll());
    }

    //    @GetMapping("/{id}")
//    public ResponseEntity<Request> getRequestById(@PathVariable Long id) {
//        return this.requestService.findById(id).map(request -> ResponseEntity.ok().body(request))
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Request>> getRequestsByUserId(@PathVariable Long userId) {
        List<Request> requests = requestService.getRequestsByUserId(userId);
        return ResponseEntity.ok().body(requests);
    }

    @PutMapping("/{requestId}/{availabilityId}/accept")
    public ResponseEntity<Void> acceptRequest(@PathVariable Long requestId, @PathVariable Long availabilityId) {
        requestService.acceptRequest(requestId, availabilityId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{requestId}/decline")
    public void declineRequest(@PathVariable Long requestId) {
        requestService.declineRequest(requestId);
    }

    @PostMapping("/create")
    public ResponseEntity<Request> createRequest(@RequestBody Request request,
                                                 @RequestParam Long availabilityId,
                                                 @RequestParam Long userRequesterId) {

//        System.out.println("Received availabilityId:"+ availabilityId);
//        System.out.println("Received userId:"+ userRequesterId);
        Request createdRequest = requestService.create(request, availabilityId, userRequesterId);
        //return ResponseEntity.created(URI.create("/api/requests/" + createdRequest.getId())).body(createdRequest);
        return ResponseEntity.ok().build();
    }
}
