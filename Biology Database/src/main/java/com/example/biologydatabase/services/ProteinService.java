package com.example.biologydatabase.services;

import com.example.biologydatabase.databaseEntities.Protein;

import java.util.List;

public interface ProteinService {
    List<Protein> getAllProteins();

    Protein getProteinById(Integer id);

    Protein saveProtein(Protein protein);

    Protein updateProtein(Integer id, Protein protein);

    void deleteProtein(Integer id);
}
