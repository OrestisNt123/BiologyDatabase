package com.example.biologydatabase.databaseEntities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.hibernate.Hibernate;

import java.util.Objects;

@Embeddable
public class ProteinPathwayId implements java.io.Serializable {
    private static final long serialVersionUID = -5321753657940836711L;

    @Column(name = "protein_id", nullable = false)
    private Integer proteinId;

    @Column(name = "pathway_id", nullable = false)
    private Integer pathwayId;

    public Integer getProteinId() {
        return proteinId;
    }

    public void setProteinId(Integer proteinId) {
        this.proteinId = proteinId;
    }

    public Integer getPathwayId() {
        return pathwayId;
    }

    public void setPathwayId(Integer pathwayId) {
        this.pathwayId = pathwayId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ProteinPathwayId that = (ProteinPathwayId) o;
        return Objects.equals(proteinId, that.proteinId) &&
                Objects.equals(pathwayId, that.pathwayId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(proteinId, pathwayId);
    }
}
