package com.jansevak.service;

import com.jansevak.event.ComplaintCreatedEvent;
import com.jansevak.model.Complaint;
import com.jansevak.repository.ComplaintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final ApplicationEventPublisher eventPublisher;

    public Complaint createComplaint(Complaint complaint, String imageUrl) {
        if (imageUrl != null) {
            complaint.setImageUrl(imageUrl);
        }
        Complaint savedComplaint = complaintRepository.save(complaint);

        // Publish event asynchronously (handled by listener)
        eventPublisher.publishEvent(new ComplaintCreatedEvent(this, savedComplaint));

        return savedComplaint;
    }

    public List<Complaint> getComplaintsByUserId(String userId) {
        return complaintRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public Complaint updateComplaintStatus(String complaintId, String status) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        complaint.setStatus(status);
        return complaintRepository.save(complaint);
    }

    public java.util.Map<String, Long> getComplaintStats() {
        List<Object[]> results = complaintRepository.countComplaintsByStatus();
        java.util.Map<String, Long> stats = new java.util.HashMap<>();
        for (Object[] result : results) {
            stats.put((String) result[0], (Long) result[1]);
        }
        return stats;
    }
}
