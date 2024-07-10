package com.example.biologydatabase.controllers;

import com.example.biologydatabase.databaseEntities.GeneProtein;
import com.example.biologydatabase.databaseEntities.GeneProteinId;
import com.example.biologydatabase.services.GeneProteinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gene-proteins")
@CrossOrigin(origins = "http://localhost:4200")
public class GeneProteinController {

    @Autowired
    private GeneProteinService geneProteinService;

    @GetMapping
    public List<GeneProtein> getAllGeneProteins() {
        return geneProteinService.getAllGeneProteins();
    }

    @GetMapping("/{geneId}/{proteinId}")
    public GeneProtein getGeneProteinById(@PathVariable Integer geneId, @PathVariable Integer proteinId) {
        GeneProteinId id = new GeneProteinId();
        id.setGeneId(geneId);
        id.setProteinId(proteinId);
        return geneProteinService.getGeneProteinById(id);
    }

    @PostMapping
    public GeneProtein addGeneProtein(@RequestBody GeneProtein geneProtein) {
        return geneProteinService.saveGeneProtein(geneProtein);
    }

    @PutMapping("/{geneId}/{proteinId}")
    public GeneProtein updateGeneProtein(@PathVariable Integer geneId, @PathVariable Integer proteinId,
                                         @RequestBody GeneProtein geneProtein) {
        GeneProteinId oldId = new GeneProteinId();
        oldId.setGeneId(geneId);
        oldId.setProteinId(proteinId);
        return geneProteinService.updateGeneProtein(oldId, geneProtein);
    }

    @DeleteMapping("/{geneId}/{proteinId}")
    public void deleteGeneProtein(@PathVariable Integer geneId, @PathVariable Integer proteinId) {
        GeneProteinId id = new GeneProteinId();
        id.setGeneId(geneId);
        id.setProteinId(proteinId);
        geneProteinService.deleteGeneProtein(id);
    }
}
