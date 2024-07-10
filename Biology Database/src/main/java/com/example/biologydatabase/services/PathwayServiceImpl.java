package com.example.biologydatabase.services;

import com.example.biologydatabase.databaseEntities.Pathway;
import com.example.biologydatabase.repositories.PathwayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PathwayServiceImpl implements PathwayService {

    @Autowired
    private PathwayRepository pathwayRepository;

    @Override
    public List<Pathway> getAllPathways() {
        return pathwayRepository.findAll();
    }

    @Override
    public Pathway getPathwayById(Integer id) {
        Optional<Pathway> pathwayOptional = pathwayRepository.findById(id);
        return pathwayOptional.orElse(null);
    }

    @Override
    public Pathway savePathway(Pathway pathway) {

        return pathwayRepository.save(pathway);
    }

    @Override
    public Pathway updatePathway(Integer id, Pathway pathway) {
        pathway.setId(id);
        return pathwayRepository.save(pathway);
    }

    @Override
    public void deletePathway(Integer id) {
        pathwayRepository.deleteById(id);
    }
}
