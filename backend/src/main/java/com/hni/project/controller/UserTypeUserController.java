package com.hni.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hni.project.dao.UserRepository;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/users")
public class UserTypeUserController {

    private final UserRepository userRepository;

    public UserTypeUserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PutMapping("/{userId}/type-user")
    public ResponseEntity<Void> updateTypeUser(
            @PathVariable Long userId,
            @RequestParam Long typeUserId) {
        if (!userRepository.existsById(userId)) {
            return ResponseEntity.notFound().build();
        }

        userRepository.updateTypeUser(userId, typeUserId);
        return ResponseEntity.noContent().build();
    }
}
