package com.example.biologydatabase.services;

import com.example.biologydatabase.databaseEntities.GeneProtein;
import com.example.biologydatabase.databaseEntities.GeneProteinId;

import java.util.List;

public interface GeneProteinService {
    List<GeneProtein> getAllGeneProteins();

    GeneProtein getGeneProteinById(GeneProteinId id);

    GeneProtein saveGeneProtein(GeneProtein geneProtein);

    GeneProtein updateGeneProtein(GeneProteinId id, GeneProtein geneProtein);

    void deleteGeneProtein(GeneProteinId id);
}
