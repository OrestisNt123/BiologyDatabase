package com.example.biologydatabase.databaseEntities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.Hibernate;

import java.util.Objects;

@Embeddable
public class GeneProteinId implements java.io.Serializable {
    private static final long serialVersionUID = 1635597257847610323L;

    @Column(name = "gene_id", nullable = false)
    private Integer geneId;

    @Column(name = "protein_id", nullable = false)
    private Integer proteinId;

    public Integer getGeneId() {
        return geneId;
    }

    public void setGeneId(Integer geneId) {
        this.geneId = geneId;
    }

    public Integer getProteinId() {
        return proteinId;
    }

    public void setProteinId(Integer proteinId) {
        this.proteinId = proteinId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        GeneProteinId that = (GeneProteinId) o;
        return Objects.equals(geneId, that.geneId) &&
                Objects.equals(proteinId, that.proteinId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(geneId, proteinId);
    }
}
