package com.example.biologydatabase.repositories;

import com.example.biologydatabase.databaseEntities.Gene;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneRepository extends JpaRepository<Gene, Integer> {
}
