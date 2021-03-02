package com.devjournal.controller;

import com.devjournal.model.User;
import com.devjournal.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value ="/logDetails", method = RequestMethod.GET)
    @ResponseBody
    public String getLoggedUserDetails(Principal principal) throws JsonProcessingException {
        User user = repository.findByLogin(principal.getName());
        Map<String, String> loggedUserDetails = new HashMap<>();
        loggedUserDetails.put("username", user.getLogin());
        loggedUserDetails.put("githubAccessToken", user.getGithubAccessToken());
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        return ow.writeValueAsString(loggedUserDetails);
    }
}
