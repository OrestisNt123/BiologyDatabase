package com.example.biologydatabase.services;

import com.example.biologydatabase.databaseEntities.Pathway;
import com.example.biologydatabase.databaseEntities.Protein;
import com.example.biologydatabase.databaseEntities.ProteinPathway;
import com.example.biologydatabase.databaseEntities.ProteinPathwayId;
import com.example.biologydatabase.repositories.PathwayRepository;
import com.example.biologydatabase.repositories.ProteinRepository;
import com.example.biologydatabase.repositories.ProteinPathwayRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProteinPathwayServiceImpl implements ProteinPathwayService {

    @Autowired
    private ProteinPathwayRepository proteinPathwayRepository;

    @Autowired
    private ProteinRepository proteinRepository;

    @Autowired
    private PathwayRepository pathwayRepository;

    @Override
    public List<ProteinPathway> getAllProteinPathways() {
        return proteinPathwayRepository.findAll();
    }

    @Override
    public ProteinPathway getProteinPathwayById(ProteinPathwayId id) {
        Optional<ProteinPathway> proteinPathwayOptional = proteinPathwayRepository.findById(id);
        return proteinPathwayOptional.orElse(null);
    }

    @Override
    public ProteinPathway saveProteinPathway(ProteinPathway proteinPathway) {
        return proteinPathwayRepository.save(proteinPathway);
    }

    @Transactional
    public ProteinPathway updateProteinPathway(ProteinPathwayId oldId, ProteinPathway updatedProteinPathway) {
        // Fetch the existing entity
        ProteinPathway existingProteinPathway = proteinPathwayRepository.findById(oldId)
                .orElseThrow(() -> new EntityNotFoundException("ProteinPathway not found with id: " + oldId));

        // Fetch the managed Protein and Pathway entities from the database
        Protein newProtein = proteinRepository.findById(updatedProteinPathway.getProtein().getId())
                .orElseThrow(() -> new EntityNotFoundException("Protein not found with id: " + updatedProteinPathway.getProtein().getId()));
        Pathway newPathway = pathwayRepository.findById(updatedProteinPathway.getPathway().getId())
                .orElseThrow(() -> new EntityNotFoundException("Pathway not found with id: " + updatedProteinPathway.getPathway().getId()));

        // Create a new ProteinPathway entity
        ProteinPathway newProteinPathway = new ProteinPathway();
        ProteinPathwayId newId = new ProteinPathwayId();
        newId.setProteinId(newProtein.getId());
        newId.setPathwayId(newPathway.getId());

        newProteinPathway.setId(newId);
        newProteinPathway.setProtein(newProtein);
        newProteinPathway.setPathway(newPathway);

        // Delete the old entity
        proteinPathwayRepository.delete(existingProteinPathway);

        // Save the new entity
        return proteinPathwayRepository.save(newProteinPathway);
    }

    @Override
    public void deleteProteinPathway(ProteinPathwayId id) {
        proteinPathwayRepository.deleteById(id);
    }
}
