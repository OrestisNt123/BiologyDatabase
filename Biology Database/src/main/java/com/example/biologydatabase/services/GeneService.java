package com.example.biologydatabase.services;

import com.example.biologydatabase.databaseEntities.Gene;

import java.util.List;

public interface GeneService {
    List<Gene> getAllGenes();

    Gene getGeneById(Integer id);

    Gene saveGene(Gene gene);

    void deleteGeneById(Integer id);
}
