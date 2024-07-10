package com.example.biologydatabase.databaseEntities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "gene_protein")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class GeneProtein {
    @EmbeddedId
    private GeneProteinId id;

    @MapsId("geneId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "gene_id", nullable = false)
    private Gene gene;

    @MapsId("proteinId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "protein_id", nullable = false)
    private Protein protein;

    public GeneProteinId getId() {
        return id;
    }

    public void setId(GeneProteinId id) {
        this.id = id;
    }

    public Gene getGene() {
        return gene;
    }

    public void setGene(Gene gene) {
        this.gene = gene;
    }

    public Protein getProtein() {
        return protein;
    }

    public void setProtein(Protein protein) {
        this.protein = protein;
    }
}
