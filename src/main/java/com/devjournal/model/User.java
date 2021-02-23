package com.devjournal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class User {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String login;

    @JsonIgnore
    @Column(name = "pass_hash")
    private String passHash;

    @OneToMany(mappedBy = "owner")
    private Collection<Project> projects;

    protected User() { }

    public User(String login, String password) {
        this.login = login;
        this.setPassHash(password);
    }

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassHash() { return passHash; }

    public void setPassHash(String password) {
        this.passHash = PASSWORD_ENCODER.encode(password);
    }

    public Collection<Project> getProjects() {
        return projects;
    }

    public void setProjects(Collection<Project> projects) {
        this.projects = projects;
    }
}
