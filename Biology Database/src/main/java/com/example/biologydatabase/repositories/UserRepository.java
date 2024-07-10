package com.example.biologydatabase.repositories;

import com.example.biologydatabase.databaseEntities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // Custom query methods (if any) can be defined here
}
