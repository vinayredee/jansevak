package com.jansevak.controller;

import com.jansevak.model.Complaint;
import com.jansevak.model.User;
import com.jansevak.service.ComplaintService;
import com.jansevak.service.FileStorageService;
import com.jansevak.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@RequiredArgsConstructor
public class ComplaintController {

    private final ComplaintService complaintService;
    private final UserService userService;
    private final FileStorageService fileStorageService;

    @PostMapping
    public ResponseEntity<Complaint> createComplaint(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userService.getUserByUsername(username);

        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = fileStorageService.storeFile(image);
        }

        Complaint complaint = new Complaint();
        complaint.setTitle(title);
        complaint.setDescription(description);
        complaint.setUserId(user.getId());

        // imageUrl is passed separately to the service
        Complaint savedComplaint = complaintService.createComplaint(complaint, imageUrl);

        return ResponseEntity.ok(savedComplaint);
    }

    @GetMapping
    public ResponseEntity<List<Complaint>> getComplaints() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userService.getUserByUsername(username);

        List<Complaint> complaints = complaintService.getComplaintsByUserId(user.getId());
        return ResponseEntity.ok(complaints);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        // In a real app, check for ADMIN role here or via SecurityConfig
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Complaint> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        Complaint updated = complaintService.updateComplaintStatus(id, status);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        // In a real app, check for ADMIN role here or via SecurityConfig
        return ResponseEntity.ok(complaintService.getComplaintStats());
    }
}
