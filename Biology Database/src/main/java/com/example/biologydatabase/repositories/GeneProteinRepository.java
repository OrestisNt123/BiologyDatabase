package com.example.biologydatabase.repositories;

import com.example.biologydatabase.databaseEntities.GeneProtein;
import com.example.biologydatabase.databaseEntities.GeneProteinId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneProteinRepository extends JpaRepository<GeneProtein, GeneProteinId> {
}
