package com.example.biologydatabase.services;

import com.example.biologydatabase.databaseEntities.Protein;
import com.example.biologydatabase.databaseEntities.Gene;
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
public class ProteinServiceImpl implements ProteinService {

    @Autowired
    private ProteinRepository proteinRepository;

    @Autowired
    private GeneRepository geneRepository;

    @Override
    public List<Protein> getAllProteins() {
        return proteinRepository.findAll();
    }

    @Override
    public Protein getProteinById(Integer id) {
        Optional<Protein> proteinOptional = proteinRepository.findById(id);
        return proteinOptional.orElse(null);
    }

    @Override
    public Protein saveProtein(Protein protein) {
        Gene existingGene = geneRepository.findById(protein.getGene().getId())
                .orElseThrow(() -> new EntityNotFoundException("Gene not found"));

        protein.setGene(existingGene);
        return proteinRepository.save(protein);
    }

    @Override
    public Protein updateProtein(Integer proteinId, Protein protein) {
        Protein existingProtein = proteinRepository.findById(proteinId)
                .orElseThrow(() -> new EntityNotFoundException("Protein not found"));

        Gene existingGene = geneRepository.findById(existingProtein.getGene().getId())
                .orElseThrow(() -> new EntityNotFoundException("Gene not found"));

        existingProtein.setGene(existingGene);

        existingProtein.setName(protein.getName());
        existingProtein.setAminoAcid(protein.getAminoAcid());
        existingProtein.setMolecularWeight(protein.getMolecularWeight());

        return proteinRepository.save(existingProtein);
    }

    @Override
    public void deleteProtein(Integer id) {
        proteinRepository.deleteById(id);
    }
}
