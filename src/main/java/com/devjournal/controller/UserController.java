package com.devjournal.controller;

import com.devjournal.model.User;
import com.devjournal.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public String getLoggedUserDetails(Principal principal) throws JsonProcessingException {
        User user = repository.findByUsername(principal.getName());
        Map<String, String> loggedUserDetails = new HashMap<>();
        loggedUserDetails.put("username", user.getUsername());
        loggedUserDetails.put("githubAccessToken", user.getGithubAccessToken());
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        return ow.writeValueAsString(loggedUserDetails);
    }

    @RequestMapping(method = RequestMethod.PATCH)
    @ResponseBody
    public void updateUserDetails(@RequestBody Map<String, String> userDetails, HttpServletRequest request, Principal principal) {
        User user = repository.findByUsername(principal.getName());
        boolean shouldLogout = false;
        if(userDetails.containsKey("username")){
            user.setUsername(userDetails.get("username"));
            shouldLogout = true;
        }
        if(userDetails.containsKey("password")){
            user.setPassHash(userDetails.get("password"));
            shouldLogout = true;
        }
        if(userDetails.containsKey("githubAccessToken"))
            user.setGithubAccessToken(userDetails.get("githubAccessToken"));

        repository.save(user);
        if(shouldLogout) {
            SecurityContextLogoutHandler handler = new SecurityContextLogoutHandler();
            handler.logout(request, null, null);
        }
    }
}
