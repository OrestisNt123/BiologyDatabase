package com.example.biologydatabase.controllers;

import com.example.biologydatabase.databaseEntities.Protein;
import com.example.biologydatabase.services.ProteinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proteins")
@CrossOrigin(origins = "http://localhost:4200")
public class ProteinController {

    @Autowired
    private ProteinService proteinService;

    @GetMapping
    public List<Protein> getAllProteins() {
        return proteinService.getAllProteins();
    }

    @GetMapping("/{id}")
    public Protein getProteinById(@PathVariable Integer id) {
        return proteinService.getProteinById(id);
    }

    @PostMapping
    public Protein addProtein(@RequestBody Protein protein) {
        return proteinService.saveProtein(protein);
    }

    @PutMapping("/{id}")
    public Protein updateProtein(@PathVariable Integer id, @RequestBody Protein protein) {
        return proteinService.updateProtein(id, protein);
    }

    @DeleteMapping("/{id}")
    public void deleteProtein(@PathVariable Integer id) {
        proteinService.deleteProtein(id);
    }
}
