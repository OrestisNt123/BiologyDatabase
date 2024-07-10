package com.example.biologydatabase.repositories;

import com.example.biologydatabase.databaseEntities.ProteinPathway;
import com.example.biologydatabase.databaseEntities.ProteinPathwayId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProteinPathwayRepository extends JpaRepository<ProteinPathway, ProteinPathwayId> {
}
