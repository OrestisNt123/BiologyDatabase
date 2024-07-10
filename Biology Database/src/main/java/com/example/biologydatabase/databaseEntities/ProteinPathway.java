package com.example.biologydatabase.databaseEntities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "protein_pathway")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ProteinPathway {
    @EmbeddedId
    private ProteinPathwayId id;

    @MapsId("proteinId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "protein_id", nullable = false)
    private Protein protein;

    @MapsId("pathwayId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "pathway_id", nullable = false)
    private Pathway pathway;

    public ProteinPathwayId getId() {
        return id;
    }

    public void setId(ProteinPathwayId id) {
        this.id = id;
    }

    public Protein getProtein() {
        return protein;
    }

    public void setProtein(Protein protein) {
        this.protein = protein;
    }

    public Pathway getPathway() {
        return pathway;
    }

    public void setPathway(Pathway pathway) {
        this.pathway = pathway;
    }

}
