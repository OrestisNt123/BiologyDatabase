package com.example.biologydatabase.services;

import com.example.biologydatabase.databaseEntities.Gene;
import com.example.biologydatabase.databaseEntities.GeneProtein;
import com.example.biologydatabase.databaseEntities.GeneProteinId;
import com.example.biologydatabase.databaseEntities.Protein;
import com.example.biologydatabase.repositories.GeneProteinRepository;
import com.example.biologydatabase.repositories.GeneRepository;
import com.example.biologydatabase.repositories.ProteinRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class GeneProteinServiceImpl implements GeneProteinService {

    @Autowired
    private GeneProteinRepository geneProteinRepository;

    @Autowired
    private GeneRepository geneRepository;

    @Autowired
    private ProteinRepository proteinRepository;


    @Override
    public List<GeneProtein> getAllGeneProteins() {
        return geneProteinRepository.findAll();
    }

    @Override
    public GeneProtein getGeneProteinById(GeneProteinId id) {
        Optional<GeneProtein> geneProteinOptional = geneProteinRepository.findById(id);
        return geneProteinOptional.orElse(null);
    }

    @Override
    public GeneProtein saveGeneProtein(GeneProtein geneProtein) {

        return geneProteinRepository.save(geneProtein);
    }

    @Transactional
    public GeneProtein updateGeneProtein(GeneProteinId oldId, GeneProtein updatedGeneProtein) {
        // Fetch the existing entity
        GeneProtein existingGeneProtein = geneProteinRepository.findById(oldId)
                .orElseThrow(() -> new EntityNotFoundException("GeneProtein not found with id: " + oldId));

        // Fetch the managed Gene and Protein entities from the database
        Gene newGene = geneRepository.findById(updatedGeneProtein.getGene().getId())
                .orElseThrow(() -> new EntityNotFoundException("Gene not found with id: " + updatedGeneProtein.getGene().getId()));
        Protein newProtein = proteinRepository.findById(updatedGeneProtein.getProtein().getId())
                .orElseThrow(() -> new EntityNotFoundException("Protein not found with id: " + updatedGeneProtein.getProtein().getId()));

        // Create a new GeneProtein entity
        GeneProtein newGeneProtein = new GeneProtein();
        GeneProteinId newId = new GeneProteinId();
        newId.setGeneId(newGene.getId());
        newId.setProteinId(newProtein.getId());

        newGeneProtein.setId(newId);
        newGeneProtein.setGene(newGene);
        newProtein.setGene(existingGeneProtein.getProtein().getGene());
        newGeneProtein.setProtein(newProtein);

        // Delete the old entity
        geneProteinRepository.delete(existingGeneProtein);

        // Save the new entity
        return geneProteinRepository.save(newGeneProtein);
    }

    @Override
    public void deleteGeneProtein(GeneProteinId id) {
        geneProteinRepository.deleteById(id);
    }
}
