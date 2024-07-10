package com.example.biologydatabase.controllers;

import com.example.biologydatabase.databaseEntities.Gene;
import com.example.biologydatabase.services.GeneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/genes")
public class GeneController {

    private final GeneService geneService;

    @Autowired
    public GeneController(GeneService geneService) {
        this.geneService = geneService;
    }

    @GetMapping
    public List<Gene> getAllGenes() {
        return geneService.getAllGenes();
    }

    @GetMapping("/{id}")
    public Gene getGeneById(@PathVariable Integer id) {
        return geneService.getGeneById(id);
    }

    @PostMapping
    public Gene addGene(@RequestBody Gene gene) {
        return geneService.saveGene(gene);
    }

    @PutMapping("/{id}")
    public Gene updateGene(@PathVariable Integer id, @RequestBody Gene geneDetails) {
        Gene gene = geneService.getGeneById(id);
        if (gene == null) {
            return null; // or throw exception as needed
        }

        // Update properties based on geneDetails
        gene.setName(geneDetails.getName());
        gene.setDescription(geneDetails.getDescription());
        gene.setGeneType(geneDetails.getGeneType());

        return geneService.saveGene(gene);
    }

    @DeleteMapping("/{id}")
    public void deleteGene(@PathVariable Integer id) {
        geneService.deleteGeneById(id);
    }
}
