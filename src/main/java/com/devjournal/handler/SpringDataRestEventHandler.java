package com.devjournal.handler;


import com.devjournal.model.Entry;
import com.devjournal.model.Project;
import com.devjournal.model.User;
import com.devjournal.repository.EntryRepository;
import com.devjournal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler
public class SpringDataRestEventHandler {

    private final UserRepository userRepository;
    private final EntryRepository entryRepository;

    @Autowired
    public SpringDataRestEventHandler(UserRepository userRepository, EntryRepository entryRepository) {
        this.userRepository = userRepository;
        this.entryRepository = entryRepository;
    }

    @HandleBeforeCreate
    @HandleBeforeSave
    public void applyUserInformationUsingSecurityContext(final Entry entry) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByLogin(username);
        entry.setUser(user);
    }

    @HandleBeforeCreate
    @HandleBeforeSave
    public void applyUserInformationOnProject(final Project project) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByLogin(username);
        project.setOwner(user);
    }

    @HandleBeforeDelete
    public void deleteEntriesBelongingToProject(final Project project) {

        for (Entry entry: project.getEntries()
             ) {
            entryRepository.delete(entry);
        }
    }
}
