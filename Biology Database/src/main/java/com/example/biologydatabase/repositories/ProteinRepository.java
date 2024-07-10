package com.example.biologydatabase.repositories;

import com.example.biologydatabase.databaseEntities.Protein;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProteinRepository extends JpaRepository<Protein, Integer> {
}
