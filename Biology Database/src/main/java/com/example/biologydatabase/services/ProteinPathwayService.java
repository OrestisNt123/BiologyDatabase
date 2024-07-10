package com.example.biologydatabase.services;

import com.example.biologydatabase.databaseEntities.ProteinPathway;
import com.example.biologydatabase.databaseEntities.ProteinPathwayId;

import java.util.List;

public interface ProteinPathwayService {
    List<ProteinPathway> getAllProteinPathways();

    ProteinPathway getProteinPathwayById(ProteinPathwayId id);

    ProteinPathway saveProteinPathway(ProteinPathway proteinPathway);

    ProteinPathway updateProteinPathway(ProteinPathwayId id, ProteinPathway proteinPathway);

    void deleteProteinPathway(ProteinPathwayId id);
}
