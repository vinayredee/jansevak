package com.jansevak.event;

import com.jansevak.model.Complaint;
import com.jansevak.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ComplaintEventListener {

    @Autowired
    private EmailService emailService;

    @EventListener
    public void handleComplaintCreated(ComplaintCreatedEvent event) {
        Complaint complaint = event.getComplaint();
        String subject = "New Complaint Received: " + complaint.getTitle();
        String text = "Dear User,\n\n" +
                "We have received your complaint regarding: " + complaint.getTitle() + ".\n" +
                "Status: " + complaint.getStatus() + "\n\n" +
                "Description:\n" + complaint.getDescription() + "\n\n" +
                "Thank you for using JanSevak.";

        // In a real app, we would get the user's email from the User entity associated
        // with the complaint.
        // For this demo, we'll send to a dummy address or the user's email if
        // available.
        // Assuming we don't have the user's email readily available in the Complaint
        // object without fetching the User,
        // we will send to a placeholder for demonstration in Mailtrap.

        String userEmail = "user@example.com"; // Placeholder

        emailService.sendEmail(userEmail, subject, text);
    }
}
