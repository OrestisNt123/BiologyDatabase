package com.example.biologydatabase.databaseEntities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Entity
@Table(name = "proteins")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Protein {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Lob
    @Column(name = "amino_acid_count", nullable = false)
    private Integer aminoAcid;

    @Column(name = "molecular_weight", precision = 10, scale = 2)
    private BigDecimal molecularWeight;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "gene_id")
    private Gene gene;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAminoAcid() {
        return aminoAcid;
    }

    public void setAminoAcid(Integer aminoAcid) {
        this.aminoAcid = aminoAcid;
    }

    public BigDecimal getMolecularWeight() {
        return molecularWeight;
    }

    public void setMolecularWeight(BigDecimal molecularWeight) {
        this.molecularWeight = molecularWeight;
    }

    public Gene getGene() {
        return gene;
    }

    public void setGene(Gene gene) {
        this.gene = gene;
    }

}
