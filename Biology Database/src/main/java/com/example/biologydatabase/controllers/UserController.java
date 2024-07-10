package com.example.biologydatabase.controllers;

import com.example.biologydatabase.databaseEntities.User;
import com.example.biologydatabase.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody User user) {
        Optional<User> existingUser = userService.getUserByUsername(user.getUsername());
        Map<String, Object> response = new HashMap<>();
        if (existingUser.isPresent()) {
            response.put("message", "User already exists.");
            return ResponseEntity.badRequest().body(response); // User already exists
        }
        User createdUser = userService.createUser(user);
        response.put("message", "User created successfully.");
        response.put("data", createdUser);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user) {
        Optional<User> loggedInUser = userService.loginUser(user.getUsername(), user.getPassword());
        Map<String, Object> response = new HashMap<>();
        if (loggedInUser.isPresent()) {
            response.put("message", "Login successful.");
            response.put("data", loggedInUser.get());
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Wrong credentials.");
            return ResponseEntity.status(401).body(response); // Unauthorized
        }
    }
}
