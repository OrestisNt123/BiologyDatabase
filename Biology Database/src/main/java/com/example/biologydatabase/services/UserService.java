package com.example.biologydatabase.services;

import com.example.biologydatabase.databaseEntities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserByUsername(String username);
    User createUser(User user);
    User updateUser(String username, User userDetails);
    void deleteUser(String username);
    Optional<User> loginUser(String username, String password);
}
