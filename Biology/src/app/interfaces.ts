export interface Gene {
    id: number;
    name: string;
    description?: string;
    geneType: string;
  }


export interface Protein {
    id: number;
    name: string;
    molecularWeight: number;
    aminoAcid: number;
    gene: Gene;
}

export interface Pathway {
    id: number;
    name?: string;
    description?: string;
}

export interface ProteinPathway {
    id: {
        proteinId: number;
        pathwayId: number;
    }
    protein: Protein;
    pathway: Pathway;
}

export interface GeneProtein {
    id: {
        geneId: number;
        proteinId: number;
    }
    gene: Gene;
    protein: Protein;
}
