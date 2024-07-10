package com.example.biologydatabase.repositories;

import com.example.biologydatabase.databaseEntities.Pathway;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PathwayRepository extends JpaRepository<Pathway, Integer> {
}
