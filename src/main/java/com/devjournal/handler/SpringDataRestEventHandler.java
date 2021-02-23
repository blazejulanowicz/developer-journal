package com.devjournal.handler;


import com.devjournal.model.Entry;
import com.devjournal.model.User;
import com.devjournal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler
public class SpringDataRestEventHandler {

    private final UserRepository userRepository;

    @Autowired
    public SpringDataRestEventHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @HandleBeforeCreate
    @HandleBeforeSave
    public void applyUserInformationUsingSecurityContext(Entry entry) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByLogin(username);
    }
}
