package com.devjournal.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToOne
    private User owner;

    @OneToMany(mappedBy = "project")
    private Set<Entry> entries;

    public Project() {
    }
}
