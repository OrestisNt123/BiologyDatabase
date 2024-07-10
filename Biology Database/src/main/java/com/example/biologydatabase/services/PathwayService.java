package com.example.biologydatabase.services;

import com.example.biologydatabase.databaseEntities.Pathway;

import java.util.List;

public interface PathwayService {
    List<Pathway> getAllPathways();

    Pathway getPathwayById(Integer id);

    Pathway savePathway(Pathway pathway);

    Pathway updatePathway(Integer id, Pathway pathway);

    void deletePathway(Integer id);
}
