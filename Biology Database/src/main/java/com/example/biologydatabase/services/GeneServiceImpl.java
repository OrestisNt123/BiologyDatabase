package com.example.biologydatabase.services;

import com.example.biologydatabase.databaseEntities.Gene;
import com.example.biologydatabase.repositories.GeneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GeneServiceImpl implements GeneService {

    private final GeneRepository geneRepository;

    @Autowired
    public GeneServiceImpl(GeneRepository geneRepository) {
        this.geneRepository = geneRepository;
    }

    @Override
    public List<Gene> getAllGenes() {
        return geneRepository.findAll();
    }

    @Override
    public Gene getGeneById(Integer id) {
        Optional<Gene> geneOptional = geneRepository.findById(id);
        return geneOptional.orElse(null);
    }

    @Override
    public Gene saveGene(Gene gene) {
        return geneRepository.save(gene);
    }

    @Override
    public void deleteGeneById(Integer id) {
        geneRepository.deleteById(id);
    }
}
