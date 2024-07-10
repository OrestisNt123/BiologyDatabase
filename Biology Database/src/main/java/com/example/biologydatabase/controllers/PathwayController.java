package com.example.biologydatabase.controllers;

import com.example.biologydatabase.databaseEntities.Pathway;
import com.example.biologydatabase.services.PathwayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pathways")
@CrossOrigin(origins = "http://localhost:4200")
public class PathwayController {

    @Autowired
    private PathwayService pathwayService;

    @GetMapping
    public List<Pathway> getAllPathways() {
        return pathwayService.getAllPathways();
    }

    @GetMapping("/{id}")
    public Pathway getPathwayById(@PathVariable Integer id) {
        return pathwayService.getPathwayById(id);
    }

    @PostMapping
    public Pathway addPathway(@RequestBody Pathway pathway) {
        return pathwayService.savePathway(pathway);
    }

    @PutMapping("/{id}")
    public Pathway updatePathway(@PathVariable Integer id, @RequestBody Pathway pathway) {
        return pathwayService.updatePathway(id, pathway);
    }

    @DeleteMapping("/{id}")
    public void deletePathway(@PathVariable Integer id) {
        pathwayService.deletePathway(id);
    }
}
