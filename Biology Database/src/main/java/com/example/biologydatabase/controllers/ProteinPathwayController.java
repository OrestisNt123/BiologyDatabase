package com.example.biologydatabase.controllers;

import com.example.biologydatabase.databaseEntities.ProteinPathway;
import com.example.biologydatabase.databaseEntities.ProteinPathwayId;
import com.example.biologydatabase.services.ProteinPathwayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/protein-pathways")
@CrossOrigin(origins = "http://localhost:4200")
public class ProteinPathwayController {

    @Autowired
    private ProteinPathwayService proteinPathwayService;

    @GetMapping
    public List<ProteinPathway> getAllProteinPathways() {
        return proteinPathwayService.getAllProteinPathways();
    }

    @GetMapping("/{proteinId}/{pathwayId}")
    public ProteinPathway getProteinPathwayById(@PathVariable Integer proteinId, @PathVariable Integer pathwayId) {
        ProteinPathwayId id = new ProteinPathwayId();
        id.setProteinId(proteinId);
        id.setPathwayId(pathwayId);
        return proteinPathwayService.getProteinPathwayById(id);
    }

    @PostMapping
    public ProteinPathway addProteinPathway(@RequestBody ProteinPathway proteinPathway) {
        return proteinPathwayService.saveProteinPathway(proteinPathway);
    }

    @PutMapping("/{proteinId}/{pathwayId}")
    public ProteinPathway updateProteinPathway(@PathVariable Integer proteinId,
                                               @PathVariable Integer pathwayId,
                                               @RequestBody ProteinPathway proteinPathway) {

        ProteinPathwayId id = new ProteinPathwayId();
        id.setProteinId(proteinId);
        id.setPathwayId(pathwayId);
        return proteinPathwayService.updateProteinPathway(id, proteinPathway);
    }

    @DeleteMapping("/{proteinId}/{pathwayId}")
    public void deleteProteinPathway(@PathVariable Integer proteinId, @PathVariable Integer pathwayId) {
        ProteinPathwayId id = new ProteinPathwayId();
        id.setProteinId(proteinId);
        id.setPathwayId(pathwayId);
        proteinPathwayService.deleteProteinPathway(id);
    }
}
