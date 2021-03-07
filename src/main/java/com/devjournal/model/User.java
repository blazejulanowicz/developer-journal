package com.devjournal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Entity
public class User {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String username;

    @JsonIgnore
    @Column(name = "pass_hash")
    private String passHash;

    @JsonIgnore
    private String githubAccessToken;

    protected User() { }

    public User(String username, String password) {
        this.username = username;
        this.setPassHash(password);
    }

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassHash() { return passHash; }

    public void setPassHash(String password) {
        this.passHash = PASSWORD_ENCODER.encode(password);
    }

    public String getGithubAccessToken() {
        return githubAccessToken;
    }

    public void setGithubAccessToken(String githubAccessToken) {
        this.githubAccessToken = githubAccessToken;
    }
}
